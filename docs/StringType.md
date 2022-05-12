# StringType

## `@StringType(error?: ValidationError)`

The `StringType` decorator will validate if a field is a string. For example, consider you have the following `Person` class:

```typescript
import { StringType, validateInstance, CatchMany } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  constructor(name: any) {
    this.name = name
  }
}
```

If you instantiate the `Person` class with an invalid string, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person(true)

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person must be a string"] }
}
```

The `StringType` decorator default error message is `Field [field name] of [class name] must be a string`.
