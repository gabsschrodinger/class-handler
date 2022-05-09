# BooleanType

## `@BooleanType(error?: ValidationError)`

The `BooleanType` decorator will validate if a field is a boolean. For example, consider you have the following `Person` class:

```typescript
import { StringType, BooleanType, validateInstance } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @BooleanType()
  isRegistered: any

  constructor(name: any, isRegistered: any) {
    this.name = name
    this.isRegistered = isRegistered
  }
}
```

If you instantiate the `Person` class with an invalid booelan, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", "not a boolean")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field isRegistered of Person must be a boolean"] }
}
```

The `BooleanType` decorator default error message is `Field [field name] of [class name] must be a boolean`.
