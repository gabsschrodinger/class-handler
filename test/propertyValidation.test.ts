import { faker } from "@faker-js/faker";
import {
  ALPHANUMERIC_STRING_MESSAGE,
  ARRAY_TYPE_MESSAGE,
  BOOLEAN_TYPE_MESSAGE,
  CUSTOM_VALIDATION_MESSAGE,
  EMAIL_MESSAGE,
  INCLUDED_IN_ARRAY_MESSAGE,
  INTEGER_MESSAGE,
  JSON_STRING_MESSAGE,
  NOT_INCLUDED_IN_ARRAY_MESSAGE,
  NOT_NULL_MESSAGE,
  NUMBER_GREATER_THAN_MESSAGE,
  NUMBER_LESS_THAN_MESSAGE,
  NUMBER_TYPE_MESSAGE,
  NUMERIC_STRING_MESSAGE,
  STRING_MATCHING_REGEX_MESSAGE,
  STRING_TYPE_MESSAGE,
} from "../src/property/messages";
import {
  AlphanumericString,
  ArrayType,
  BooleanType,
  CustomValidation,
  Email,
  IncludedInArray,
  Integer,
  JsonString,
  NotIncludedInArray,
  NotNull,
  NumberGreaterThan,
  NumberLessThan,
  NumberType,
  NumericString,
  StringMatchingRegex,
  StringType,
} from "../src";
import { IS_JSON_STRING, NOT_STRING } from "../src/property/conditions";

import { validateDecorator } from "./helpers/propertyValidation";

describe("Property Validation Decorators", () => {
  describe("NotNull", () => {
    validateDecorator(NotNull, NOT_NULL_MESSAGE, {
      errorCondition1: undefined,
      errorCondition2: null,
      errorCondition3: "",
      successCondition: faker.random.word(),
    });
  });

  describe("Email", () => {
    validateDecorator(Email, EMAIL_MESSAGE, {
      errorCondition1: faker.random.word(),
      errorCondition2: null,
      errorCondition3: faker.datatype.uuid(),
      successCondition: faker.internet.email(),
    });
  });

  describe("StringType", () => {
    validateDecorator(StringType, STRING_TYPE_MESSAGE, {
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
    validateDecorator(decorator, NUMBER_GREATER_THAN_MESSAGE(threshold), {
      errorCondition1: faker.datatype.array(),
      errorCondition2: threshold,
      errorCondition3: faker.datatype.number({ min: 0, max: threshold }),
      successCondition: faker.datatype.number({
        min: threshold + 1,
        max: threshold + 20,
      }),
    });
  });

  describe("NumberLessThan", () => {
    const threshold = faker.datatype.number({ min: 20, max: 100000 });
    function decorator(error?: any) {
      return NumberLessThan(threshold, error);
    }
    validateDecorator(decorator, NUMBER_LESS_THAN_MESSAGE(threshold), {
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
    validateDecorator(ArrayType, ARRAY_TYPE_MESSAGE, {
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
    validateDecorator(decorator, INCLUDED_IN_ARRAY_MESSAGE(array), {
      errorCondition1: `${item}500`,
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
    validateDecorator(decorator, NOT_INCLUDED_IN_ARRAY_MESSAGE(array), {
      errorCondition1: array[1],
      errorCondition2: item,
      errorCondition3: array[5],
      successCondition: `${item}500`,
    });
  });

  describe("NumberType", () => {
    validateDecorator(NumberType, NUMBER_TYPE_MESSAGE, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.number(),
    });
  });

  describe("BooleanType", () => {
    validateDecorator(BooleanType, BOOLEAN_TYPE_MESSAGE, {
      errorCondition1: faker.datatype.array(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.boolean(),
    });
  });

  describe("JsonString", () => {
    validateDecorator(JsonString, JSON_STRING_MESSAGE, {
      errorCondition1: faker.datatype.number(),
      errorCondition2: null,
      errorCondition3: faker.random.word(),
      successCondition: faker.datatype.json(),
    });
  });

  describe("StringMatchingRegex", () => {
    const regex = /^hello$/;
    function decorator(error?: any) {
      return StringMatchingRegex(regex, error);
    }

    validateDecorator(decorator, STRING_MATCHING_REGEX_MESSAGE(regex), {
      errorCondition1: "not-hello",
      errorCondition2: null,
      errorCondition3: faker.address.city(),
      successCondition: "hello",
    });
  });

  describe("NumericString", () => {
    validateDecorator(NumericString, NUMERIC_STRING_MESSAGE, {
      errorCondition1: faker.random.word(),
      errorCondition2: null,
      errorCondition3: "5522d",
      successCondition: "456250",
    });
  });

  describe("AlphanumericString", () => {
    validateDecorator(AlphanumericString, ALPHANUMERIC_STRING_MESSAGE, {
      errorCondition1: faker.datatype.json(),
      errorCondition2: null,
      errorCondition3: faker.datatype.number(),
      successCondition: "456250as",
    });
  });

  describe("Integer", () => {
    validateDecorator(Integer, INTEGER_MESSAGE, {
      errorCondition1: faker.datatype.json(),
      errorCondition2: null,
      errorCondition3: faker.datatype.float(),
      successCondition: 12,
    });
  });

  describe("CustomValidation - Combining validations", () => {
    const MY_ERROR_CONDITION = (value: any): boolean =>
      IS_JSON_STRING(value) || NOT_STRING(value);

    function decorator(error?: any) {
      return CustomValidation(MY_ERROR_CONDITION, error);
    }

    validateDecorator(decorator, CUSTOM_VALIDATION_MESSAGE, {
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

    validateDecorator(decorator, CUSTOM_VALIDATION_MESSAGE, {
      errorCondition1: errorStr,
      errorCondition2: errorStr,
      errorCondition3: errorStr,
      successCondition: undefined,
    });
  });
});
