# NumberLessThan

## `@NumberLessThan(threshold: number, error?: ValidationError)`

The `NumberLessThan` decorator will validate if a field is a number less than the given `threshold` value. For example, consider you have the following `Person` class:

```typescript
import { StringType, NumberLessThan, validateInstance } from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @NumberLessThan(130)
  age: any

  constructor(name: any, age: any) {
    this.name = name
    this.age = age
  }
}
```

If you instantiate the `Person` class with an invalid number or a number equal or greater than the `threshold` value, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", 999999)

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field age of Person must be a number less than 130"] }
}
```

The `NumberLessThan` decorator default error message is `Field [field name] of [class name] must be a number less than [threshold]`.
