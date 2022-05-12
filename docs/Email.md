# Email

## `@Email(error?: ValidationError)`

The `Email` decorator will validate if a field is a string and a valid email. For example, consider you have the following `Person` class:

```typescript
import { StringType, Email, validateInstance, CatchMany } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @Email()
  email: any

  constructor(name: any, email: any) {
    this.name = name
    this.email = email
  }
}
```

If you instantiate the `Person` class with an invalid email, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", "random-string")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field email of Person must be a valid email"] }
}
```

The `Email` decorator default error message is `Field [field name] of [class name] must be a valid email`.
