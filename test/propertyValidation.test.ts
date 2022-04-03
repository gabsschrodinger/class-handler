import {
  ArrayType,
  BooleanType,
  CustomValidation,
  Email,
  IncludedInArray,
  JsonString,
  NotIncludedInArray,
  NotNull,
  NumberGreaterThan,
  NumberLessThan,
  NumberType,
  StringType,
} from "../src";
import { IS_JSON_STRING, NOT_STRING } from "../src/property/conditions";

import { faker } from "@faker-js/faker";
import { validateDecorator } from "./helpers/propertyValidation";

describe("Property Validation Decorators", () => {
  describe("NotNull", () => {
    validateDecorator(NotNull, {
      errorCondition1: undefined,
      errorCondition2: null,
      errorCondition3: "",
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

  describe("NumberGreaterThan", () => {
    const threshold = faker.datatype.number({ min: 20, max: 100000 });
    function decorator(error?: any) {
      return NumberGreaterThan(threshold, error);
    }
    validateDecorator(decorator, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: threshold,
      errorCondition3: faker.datatype.number({ min: 0, max: threshold - 1 }),
      successCondition: faker.datatype.number({
        min: threshold,
        max: threshold + 20,
      }),
    });
  });

  describe("NumberLessThan", () => {
    const threshold = faker.datatype.number({ min: 20, max: 100000 });
    function decorator(error?: any) {
      return NumberLessThan(threshold, error);
    }
    validateDecorator(decorator, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: threshold,
      errorCondition3: faker.datatype.number({
        min: threshold,
        max: threshold + 20,
      }),
      successCondition: faker.datatype.number({ min: 0, max: threshold - 1 }),
    });
  });

  describe("ArrayType", () => {
    validateDecorator(ArrayType, {
      errorCondition1: {},
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.array(),
    });
  });

  describe("IncludedInArray", () => {
    const array = faker.datatype.array(9);
    const item = array[0];
    function decorator(error?: any) {
      return IncludedInArray(array, error);
    }
    validateDecorator(decorator, {
      errorCondition1: item + "500",
      errorCondition2: null,
      errorCondition3: true,
      successCondition: item,
    });
  });

  describe("NotIncludedInArray", () => {
    const array = faker.datatype.array(9);
    const item = array[0];
    function decorator(error?: any) {
      return NotIncludedInArray(array, error);
    }
    validateDecorator(decorator, {
      errorCondition1: array[1],
      errorCondition2: item,
      errorCondition3: array[5],
      successCondition: item + "500",
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

  describe("CustomValidation - Combining validations", () => {
    const MY_ERROR_CONDITION = (value: any): boolean =>
      IS_JSON_STRING(value) || NOT_STRING(value);

    function decorator(error?: any) {
      return CustomValidation(MY_ERROR_CONDITION, error);
    }

    validateDecorator(decorator, {
      errorCondition1: faker.datatype.number(),
      errorCondition2: null,
      errorCondition3: faker.datatype.json(),
      successCondition: faker.random.word(),
    });
  });

  describe("CustomValidation - Creating own validation", () => {
    const errorStr = faker.random.word();
    const MY_ERROR_CONDITION = (value: any): boolean => value === errorStr;

    function decorator(error?: any) {
      return CustomValidation(MY_ERROR_CONDITION, error);
    }

    validateDecorator(decorator, {
      errorCondition1: errorStr,
      errorCondition2: errorStr,
      errorCondition3: errorStr,
      successCondition: undefined,
    });
  });
});
