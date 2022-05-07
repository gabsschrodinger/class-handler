<div align="center">
  <h1>class-handler</h1>

[![codecov](https://codecov.io/gh/gabsschrodinger/class-handler/branch/main/graph/badge.svg)](https://codecov.io/gh/gabsschrodinger/class-handler)
[![npm downloads](https://badgen.net/npm/dm/class-handler)](https://www.npmjs.com/package/class-handler)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fgabsschrodinger%2Fclass-handler%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/gabsschrodinger/class-handler/main)
[![CI](https://github.com/gabsschrodinger/class-handler/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/gabsschrodinger/class-handler/actions/workflows/ci.yml)
[![install size](https://packagephobia.com/badge?p=class-handler)](https://packagephobia.com/result?p=class-handler)

</div>

Decorator-based tools to better handle classes in JavaScript and TypeScript with a declarative approach.
Uses [validator](https://www.npmjs.com/package/validator).

## How to install

NPM:

```
npm i class-handler
```

YARN:

```
yarn add class-handler
```

## Property Decorators

The library provides a few ready-to-use property decorators, as well as tools to easily build your own. Currently we only have validation decorators, which have 2 ways of working:

- If you don't use the CatchMany class decorator, your instances will be validated by your decorators as soon as you instantiate them, throwing the first error that is found.

- If you use property decorators along with the CatchMany decorator, your errors will be stored within each instance. You can access the instance errors on demand, throwing them by calling the function `validateInstance`, or returning the errors by using the function `getInstanceErrors`.

### Example 1: without CatchMany

```typescript
import { NotNull } from "class-handler"

class SomeClass {
  @NotNull({ error: "some-error" })
  someField: string

  constructor(someField?: string) {
    this.someField = someField
  }
}

let exception

try {
  new SomeClass()
} catch (error) {
  exception = error
}

console.log(exception) // { error: "some-error" }
```

### Example 2: with CatchMany

```typescript
import { NotNull, CatchMany, StringType, validateInstance } from "class-handler"

@CatchMany({ errorMessages: [] }, "errorMessages")
class SomeClass {
  @NotNull("some field should not be null")
  @StringType("some field should be a string type")
  someField?: any

  constructor(someField?: any) {
    this.someField = someField
  }
}

let exception
const someInstance = new SomeClass()

try {
  validateInstance(someInstance)
} catch (error) {
  exception = error
}

console.log(exception) // { errorMessages: ["some field should be a string type", "some field should not be null"] }
```

### Built in property decorators

| Decorator                                                                                                                                                       | Error condition                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`@NotNull(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/NotNull.md)                                               | null, undefined or empty string                                                                      |
| [`@Email(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/Email.md)                                                   | not matching the email string pattern (string@string.string)                                         |
| [`@StringType(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/StringType.md)                                         | not being a string type according to typescript/javascript                                           |
| [`@NumberType(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/NumberType.md)                                         | not being a number type according to typescript/javascript                                           |
| [`@BooleanType(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/BooleanType.md)                                       | not being a boolean type according to typescript/javascript                                          |
| [`@ArrayType(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/ArrayType.md)                                           | not being an array according to typescript/javascript                                                |
| [`@IncludedInArray(array: Array<any>, error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/IncludedInArray.md)            | not being an item of the given array (first parameter)                                               |
| [`@NotIncludedInArray(array: Array<any>, error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/NotIncludedInArray.md)      | being an item of the given array (first parameter)                                                   |
| JsonString                                                                                                                                                      | not being a string parsable to a JSON object/array                                                   |
| [`@NumberGreaterThan(threshold: number, error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/NumberGreaterThan.md)        | not being a number or being a number less or equal than a given threshold (first parameter)          |
| NumberLessThan                                                                                                                                                  | not being a number or being a number greater or equal than a given threshold (first parameter)       |
| StringMatchingRegex                                                                                                                                             | not being a string or don't matching the given regex (first parameter)                               |
| NumericString                                                                                                                                                   | not being a string or being a string with non-numeric chars                                          |
| AlphanumericString                                                                                                                                              | not being a string or being a string with non-alphanumeric chars                                     |
| [`@Integer(error?: ValidationError)`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/Integer.md)                                               | not being a number or not being an integer                                                           |
| ArrayOf                                                                                                                                                         | not being an array or having any array item that does't pass the success condition (first parameter) |
| [`@NestedObject( ObjectConstructor: Constructable, error?: ValidationError )`](https://github.com/gabsschrodinger/class-handler/blob/main/docs/NestedObject.md) | not being a valid object (validated with class-handler, first parameter)                             |
| Enum                                                                                                                                                            | not being a value from a given enum (first parameter)                                                |

### CustomValidation decorator

The CustomValidation decorator receives a condition, which is a function that receives the value (its only argument) of type any, returning true for the error case and false for success.

### Example

```typescript
import { CustomValidation } from "class-handler"

const isLessThanTenValidation = (value: any) => value < 10

class SomeClass {
  @CustomValidation(isLessThanTenValidation, { error: "Value is less than 10" })
  someField: number

  constructor(someField: number) {
    this.someField = someField
  }
}

let exception: any

try {
  new SomeClass(5)
} catch (error) {
  exception = error
}

console.log(exception) // { error: "Value is less than 10" }
```

### validationDecorator function

With the validationDecorator function, you can easily create your own property validation decorator. The function receives 2 arguments: the first one is the validation function/callback, exactly like in the CustomValidation decorator, and the second one is the error you want to throw, which can be an object, a string, an Error instance, or a callback function that receives 2 string parameters, class name and class property, and returns a error message (string).

### Example

```typescript
import { validationDecorator } from "class-handler"

const isLessThanTenValidation = (value: any) => value < 10

const GreaterThanTen = validationDecorator(isLessThanTenValidation, {
  error: "Value is less than 10",
})

class SomeClass {
  @GreaterThanTen
  someField: number

  constructor(someField: number) {
    this.someField = someField
  }
}

let exception: any

try {
  new SomeClass(5)
} catch (error) {
  exception = error
}

console.log(exception) // { error: "Value is less than 10" }
```

Another way to use the validationDecorator function is returning the function, instead of its result. This is useful in case you want to pass parameters to your own decorator.

### Example

```typescript
import { validationDecorator } from "class-handler"

const isLessThanTenValidation = (value: any) => value < 10

function GreaterThanTen(error: Object | string | Error) {
  return validationDecorator(isLessThanTenValidation, error)
}

class SomeClass {
  @GreaterThanTen({
    error: "Value is less than 10",
  })
  someField: number

  constructor(someField: number) {
    this.someField = someField
  }
}

let exception: any

try {
  new SomeClass(5)
} catch (error) {
  exception = error
}

console.log(exception) // { error: "Value is less than 10" }
```

Both of these alternative decorators work the same way as the ready-to-use decorators, including with and without the CatchMany decorator.

## Class Decorators

Currently we only have 1 class decorator, which is the CatchMany. This decorator modify the behaviour of the property decorators.

Without the CatchMany decorator, the validation decorators will throw the first error they found as soon as the class is instantiated.

With the CatchMany decorator, the errors will be stored in each given instance at the moment they are instantiate, in the model you defined. The errors will be thrown when you call the validateInstance function, passing the given instance as the parameter.

The first CatchMany argument is the error object you want to throw in case of error(s). It's important to notice that one of this object fields must be an array. Each property decorator that cactches an error will push its error string into that array.

That means that when you use the CatchMany decorator, you must pass only strings for your property decorator. If you use the CatchMany decorator and pass an Object for your property decorators, you'll receive an error.

For usage examples, check "Example 1: without CatchMany" and "Example 2: with CatchMany" at the Property Decorators section.

## Contact

- [Twitter](https://twitter.com/_gabsfernandes)
