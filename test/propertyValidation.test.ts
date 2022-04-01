import {
  BooleanType,
  Email,
  JsonString,
  NotNull,
  NumberType,
  StringType,
} from "../src";
import { IS_JSON_STRING, NOT_STRING } from "../src/property/conditions";
import {
  validateCustomDecorator,
  validateDecorator,
} from "./helpers/propertyValidation";

import { faker } from "@faker-js/faker";

describe("Property Validation Decorators", () => {
  describe("NotNull", () => {
    validateDecorator(NotNull, {
      errorCondition1: undefined,
      errorCondition2: null,
      errorCondition3: undefined,
      successCondition: faker.random.word(),
    });
  });

  describe("Email", () => {
    validateDecorator(Email, {
      errorCondition1: faker.random.word(),
      errorCondition2: null,
      errorCondition3: faker.datatype.uuid(),
      successCondition: faker.internet.email(),
    });
  });

  describe("StringType", () => {
    validateDecorator(StringType, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: null,
      errorCondition3: faker.datatype.number(),
      successCondition: faker.random.word(),
    });
  });

  describe("NumberType", () => {
    validateDecorator(NumberType, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.number(),
    });
  });

  describe("BooleanType", () => {
    validateDecorator(BooleanType, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.boolean(),
    });
  });

  describe("JsonString", () => {
    validateDecorator(JsonString, {
      errorCondition1: faker.datatype.number(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.json(),
    });
  });

  describe("CustomValidation", () => {
    describe("Combining validations", () => {
      const MY_ERROR_CONDITION = (value: any): boolean =>
        IS_JSON_STRING(value) || NOT_STRING(value);

      validateCustomDecorator(MY_ERROR_CONDITION, {
        errorCondition1: faker.datatype.number(),
        errorCondition2: null,
        errorCondition3: faker.datatype.json(),
        successCondition: faker.random.word(),
      });
    });

    describe("Creating own validation", () => {
      const errorStr = faker.random.word();
      const MY_ERROR_CONDITION = (value: any): boolean => value === errorStr;

      validateCustomDecorator(MY_ERROR_CONDITION, {
        errorCondition1: errorStr,
        errorCondition2: errorStr,
        errorCondition3: errorStr,
        successCondition: undefined,
      });
    });
  });
});
