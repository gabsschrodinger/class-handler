# NumericString

## `@NumericString(error?: ValidationError)`

The `NumericString` decorator will validate if a field is a string with only numeric characters. For example, consider you have the following `Person` class:

```typescript
import {
  StringType,
  NumericString,
  validateInstance,
  CatchMany,
} from "class-handler"

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringType()
  name: any

  @NumericString()
  phone: any

  constructor(name: any, phone: any) {
    this.name = name
    this.phone = phone
  }
}
```

If you instantiate the `Person` class with an invalid string or with a string containing characters besides 0-9, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name", "9233ss")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: ["Field phone of Person must be a numeric string"] }
}
```

The `NumericString` decorator default error message is `Field [field name] of [class name] must be a numeric string`.
