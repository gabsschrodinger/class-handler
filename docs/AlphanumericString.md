# AlphanumericString

## `@AlphanumericString(error?: ValidationError)`

The `AlphanumericString` decorator will validate if a field is a string with only alphanumeric characters. For example, consider you have the following `Person` class:

```typescript
import { AlphanumericString, validateInstance, CatchMany } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @AlphanumericString()
  name: any

  constructor(name: any) {
    this.name = name
  }
}
```

If you instantiate the `Person` class with an invalid string or with a string containing characters besides 0-9 and a-z (case insensitive), it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name!")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person must be an alphanumeric string"] }
}
```

The `NumericString` decorator default error message is `Field [field name] of [class name] must be an alphanumeric string`.
