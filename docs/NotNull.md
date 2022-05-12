# NotNull

## `@NotNull(error?: ValidationError)`

The `NotNull` decorator will validate if a field is not null (null, undefined or empty string). For example, consider you have the following `Person` class:

```typescript
import { NotNull, validateInstance, CatchMany } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @NotNull()
  name?: any

  constructor(name?: any) {
    this.name = name
  }
}
```

If you instantiate the `Person` class without a name, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person()

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person can't be null"] }
}
```

The `NotNull` decorator default error message is `Field [field name] of [class name] can't be null`.
