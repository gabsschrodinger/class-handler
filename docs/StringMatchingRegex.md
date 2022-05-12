# StringMatchingRegex

## `@StringMatchingRegex(regex: RegExp, error?: ValidationError)`

The `StringMatchingRegex` decorator will validate if a field is a string that matches the received regular expression (RegExp - first parameter). For example, consider you have the following `Person` class, and you want to prevent whitespace characters in the `name` field:

```typescript
import { StringMatchingRegex, validateInstance, CatchMany } from "class-handler"

const nonSpaceRegex = /^\S+$/

@CatchMany({ messages: [] }, "messages")
class Person {
  @StringMatchingRegex(nonSpaceRegex)
  name: any

  constructor(name: any) {
    this.name = name
  }
}
```

If you instantiate the `Person` class with an invalid string or with an string containing whitespace characters, it will throw an error in case you aren't using the `CatchMany` decorator, and it will store the error within the instance in case you are:

```typescript
try {
  const person = new Person("Some Name")

  validateInstance(person)
} catch (error) {
  console.log(error) // { messages: [ 'Field name of Person must match /^\\S+$/ regex' ] }
}
```

The `StringMatchingRegex` decorator default error message is `Field [field name] of [class name] must match [regex] regex`.
