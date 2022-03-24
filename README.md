# class-handler

Provides decorators to help with class handling.
Uses [validator](https://www.npmjs.com/package/validator).
Made with TypeScript, compiled to common JavaScript with d.ts files.

## How to install

NPM:

```
npm i class-handler
```

YARN:

```
yarn add class-handler
```

## Examples

```typescript
import { NotNull } from "class-handler";

class SomeClass {
  @NotNull({ error: "some-error" })
  someField: string;

  constructor(someField?: string) {
    this.someField = someField;
  }
}

let exception;

try {
  new SomeClass();
} catch (error) {
  exception = error;
}

console.log(exception); // { error: 'some-error' }
```

## Contact

- [Twitter](https://twitter.com/_gabsfernandes)
