# Integer

## `@Integer(error?: ValidationError)`

The `Integer` decorator will validate if a field is an integer. For example, consider you have the following `Person` class:

```typescript
import { StringType, Integer, validateInstance } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @Integer()
  age: any

  constructor(name: any, age: any) {
    this.name = name
    this.age = age
  }
}
```

If you instantiate the `Person` class with an invalid integer, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", 11.2)

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person must be an integer"] }
}
```

The `Integer` decorator default error message is `Field [field name] of [class name] must be an integer`.
