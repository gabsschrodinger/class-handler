# NotIncludedInArray

## `@NotIncludedInArray(array: Array<any>, error?: ValidationError)`

The `NotIncludedInArray` decorator validate if a field value is NOT one of the values of an array. For example, if you have a `Person` class with a `name` field, you can create an array with the banned names values, like the following:

```typescript
import { NotIncludedInArray, StringType, NumberType } from "class-handler"

const bannedNames = ["sucks", "idiot"]

class Product {
  @StringType()
  @NotIncludedInArray(bannedNames)
  name: string

  @NumberType()
  age: number

  constructor({ name: string, age: number }: any) {
    this.name = name
    this.age = age
  }
}
```

If we try to instantiate a `Person` with a name value that is included in the `bannedNames` array, it will throw an error:

```typescript
let exception: any

try {
  new Person({ name: "idiot", age: 25 })
} catch (error) {
  exception = error
}

console.log(exception) // Error: Field name of Product can't be an item of array sucks,idiot
```

The `NotIncludedInArray` decorator default error message is `Field [field name] of [class name] can't be an item of array [array items]`.
