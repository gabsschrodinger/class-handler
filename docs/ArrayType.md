# ArrayType

## `@ArrayType(error?: ValidationError)`

The `ArrayType` decorator will validate if a field is an array. For example, consider you have the following `Person` class:

```typescript
import { StringType, ArrayType, validateInstance } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @ArrayType()
  friends: any

  constructor(name: any, friends: any) {
    this.name = name
    this.friends = friends
  }
}
```

If you instantiate the `Person` class without an array, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", "not an array")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person must be an array"] }
}
```

The `ArrayType` decorator default error message is `Field [field name] of [class name] must be an array`.
