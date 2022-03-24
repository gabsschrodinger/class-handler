import { Email, JsonString, NotNull, StringType } from "../src";

import { faker } from "@faker-js/faker";
import { validateDecorator } from "./helpers/propertyValidation";

describe("Property Validation Decorators", () => {
  describe("NotNull", () => {
    validateDecorator(NotNull, [
      undefined,
      null,
      undefined,
      faker.random.word(),
    ]);
  });

  describe("Email", () => {
    validateDecorator(Email, [
      faker.random.word(),
      null,
      faker.datatype.uuid(),
      faker.internet.email(),
    ]);
  });

  describe("StringType", () => {
    validateDecorator(StringType, [
      faker.datatype.array(),
      null,
      faker.datatype.number(),
      faker.random.word(),
    ]);
  });

  describe("JsonString", () => {
    validateDecorator(JsonString, [
      faker.datatype.number(),
      null,
      faker.random.word(),
      faker.datatype.json(),
    ]);
  });
});
