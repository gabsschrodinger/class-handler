# Valid

## `@Valid(ValidationClass: Constructable, error?: ValidationError)`

The `Valid` decorator allows you to validate nested objects. For example, let's say you have a product object/entity, and inside the prodcut you have an owner object/entity. You can create a class for `Product` and another one for `Owner`, like the following:

```typescript
import { StringType, Email, NumberType, Valid } from "class-handler"

interface OwnerSchema {
  name: string
  email: string
}

class Owner {
  @StringType()
  name: string

  @Email()
  email: string

  constructor({ name, email }: OwnerSchema) {
    this.name = name
    this.email = email
  }
}

interface ProductSchema {
  name: string
  price: number
  owner: OwnerSchema
}

class Product {
  @String()
  name: string

  @NumberType()
  price: number

  @Valid(Owner)
  owner: Owner

  constructor({ name, price, owner }: ProductSchema) {
    this.name = name
    this.price = price
    this.owner = owner
  }
}
```

This way, both the `Product` and the nested `Owner` will be validated when the class be intantiated. It is important to say that the nested object, which is the `Owner` in this example, must have the `class-handler` validation decorators as well, like the `StringType` to be validated. The nested object don't need to have the `CatchMany` decorator, the behaviour of the `Product` class will NOT be impacted wheater the `Owner` have the `CatchMany` or not.

The nested object needs to have the constructor like in the example, receiving the required fields as an object, because the `class-handler` library will pass the entire nested object to the `ValidationClass` constructor (which is the `Owner` in the example). You don't have to use the schema pattern though. You can simply use the `any` type, and/or assign each value in the constructor implementation, like the following:

```typescript
import { StringType, Email } from "class-handler"

class Owner {
  @StringType()
  name: string

  @Email()
  email: string

  constructor(o: any) {
    this.name = o.name
    this.email = o.email
  }
}
```
