import { Email, JsonString, NotNull, StringType } from "../src";
import { IS_JSON_STRING, NOT_STRING } from "../src/property/conditions";
import {
  validateCustomDecorator,
  validateDecorator,
} from "./helpers/propertyValidation";

import { faker } from "@faker-js/faker";

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

  describe("CustomValidation", () => {
    describe("Combining validations", () => {
      const MY_ERROR_CONDITION = (value: any): boolean =>
        IS_JSON_STRING(value) || NOT_STRING(value);

      validateCustomDecorator(MY_ERROR_CONDITION, [
        faker.datatype.number(),
        null,
        faker.datatype.json(),
        faker.random.word(),
      ]);
    });

    describe("Creating own validation", () => {
      const errorStr = faker.random.word();
      const MY_ERROR_CONDITION = (value: any): boolean => value === errorStr;

      validateCustomDecorator(MY_ERROR_CONDITION, [
        errorStr,
        errorStr,
        errorStr,
        undefined,
      ]);
    });
  });
});
