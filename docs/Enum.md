# Enum

## `@Enum(o: object, error?: ValidationError)`

The `Enum` decorator validate if a field value is one of the values of an enum. For example, if you have a `Product` class with a `size` field, you can create an enum with the allowed size values, like the following:

```typescript
import { Enum, StringType, NumberType } from "class-handler"

enum AllowedSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

class Product {
  @StringType()
  name: string

  @NumberType()
  price: number

  @Enum(allowedSizes)
  size: string

  constructor({ name: string, price: number, size: string }: any) {
    this.name = name
    this.price = price
    this.size = size
  }
}
```

If we try to instantiate a `Product` with a size value that is not included in the `AllowedSizes` enum, it will throw an error:

```typescript
let exception: any

try {
  new Product({ name: "book", price: 50, size: "XL" })
} catch (error) {
  exception = error
}

console.log(exception) // Error: Field size of Product is not a valid value (small,medium,large)
```

The `Enum` decorator default error message is `Field [field name] of [class name] is not a valid value ([enum items])`.
