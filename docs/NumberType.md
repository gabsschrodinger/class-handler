# NumberType

## `@NumberType(error?: ValidationError)`

The `NumberType` decorator will validate if a field is a number. For example, consider you have the following `Person` class:

```typescript
import {
  StringType,
  NumberType,
  validateInstance,
  CatchMany,
} from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @NumberType()
  age: any

  constructor(name: any, age: any) {
    this.name = name
    this.age = age
  }
}
```

If you instantiate the `Person` class with an invalid number, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", "not a number")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field age of Person must be a number"] }
}
```

The `NumberType` decorator default error message is `Field [field name] of [class name] must be a number`.
