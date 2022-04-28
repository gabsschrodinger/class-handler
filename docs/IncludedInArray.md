# IncludedInArray

## `@IncludedInArray(array: Array<any>, error?: ValidationError)`

The `IncludedInArray` decorator validate if a field value is one of the values of an array. For example, if you have a `Product` class with a `size` field, you can create an array with the allowed size values, like the following:

```typescript
import { IncludedInArray, StringType, NumberType } from "class-handler"

const allowedSizes = ["small", "medium", "large"]

class Product {
  @StringType()
  name: string

  @NumberType()
  price: number

  @IncludedInArray(allowedSizes)
  size: string

  constructor({ name: string, price: number, size: string }: any) {
    this.name = name
    this.price = price
    this.size = size
  }
}
```

If we try to instantiate a `Product` with a size value that is not included in the `allowedSizes` array, it will throw an error:

```typescript
let exception: any

try {
  new Product({ name: "book", price: 50, size: "XL" })
} catch (error) {
  exception = error
}

console.log(exception) // Error: Field size of Product must be an item of array small,medium,large
```

The `IncludedInArray` decorator default error message is `Field [field name] of [class name] must be an item of array [array items]`.
