# NumberGreaterThan

## `@NumberGreaterThan(threshold: number, error?: ValidationError)`

The `NumberGreaterThan` decorator will validate if a field is a number greater than the given `threshold` value. For example, consider you have the following `Person` class:

```typescript
import { StringType, NumberGreaterThan, validateInstance } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @NumberGreaterThan(18)
  age: any

  constructor(name: any, age: any) {
    this.name = name
    this.age = age
  }
}
```

If you instantiate the `Person` class with an invalid number or a number equal or less than the `threshold` value, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", 18)

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field name of Person must be a number greater than 18"] }
}
```

The `NumberGreaterThan` decorator default error message is `Field [field name] of [class name] must be a number greater than [threshold]`.
