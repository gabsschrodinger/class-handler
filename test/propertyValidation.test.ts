import { faker } from "@faker-js/faker"
import {
  ALPHANUMERIC_STRING_MESSAGE,
  ARRAY_OF_MESSAGE,
  ARRAY_TYPE_MESSAGE,
  BOOLEAN_TYPE_MESSAGE,
  CUSTOM_VALIDATION_MESSAGE,
  EMAIL_MESSAGE,
  ENUM_MESSAGE,
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
  VALID_MESSAGE,
} from "../src/property/messages"
import {
  AlphanumericString,
  ArrayOf,
  ArrayType,
  BooleanType,
  CustomValidation,
  Email,
  Enum,
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
  Valid,
} from "../src"
import { isNotJsonString, isString } from "../src/property/conditions"

import { validateDecorator } from "./helpers/propertyValidation"
import { ValidationError } from "../src/types"

describe("Property Validation Decorators", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("NotNull", () => {
    validateDecorator(NotNull, NOT_NULL_MESSAGE, {
      errorScenario1: undefined,
      errorScenario2: null,
      errorScenario3: "",
      errorScenario4: null,
      successScenario1: faker.random.word(),
    })
  })

  describe("Email", () => {
    validateDecorator(Email, EMAIL_MESSAGE, {
      errorScenario1: faker.random.word(),
      errorScenario2: null,
      errorScenario3: faker.datatype.uuid(),
      errorScenario4: faker.datatype.json(),
      successScenario1: faker.internet.email(),
    })
  })

  describe("StringType", () => {
    validateDecorator(StringType, STRING_TYPE_MESSAGE, {
      errorScenario1: faker.datatype.array(),
      errorScenario2: null,
      errorScenario3: faker.datatype.number(),
      errorScenario4: faker.datatype.boolean(),
      successScenario1: faker.random.word(),
    })
  })

  describe("NumberGreaterThan", () => {
    const threshold = faker.datatype.number({ min: 20, max: 100000 })
    function decorator(error?: any) {
      return NumberGreaterThan(threshold, error)
    }
    validateDecorator(decorator, NUMBER_GREATER_THAN_MESSAGE(threshold), {
      errorScenario1: faker.datatype.array(),
      errorScenario2: threshold,
      errorScenario3: faker.datatype.number({ min: 0, max: threshold }),
      errorScenario4: undefined,
      successScenario1: faker.datatype.number({
        min: threshold + 1,
        max: threshold + 20,
      }),
    })
  })

  describe("NumberLessThan", () => {
    const threshold = faker.datatype.number({ min: 20, max: 100000 })
    function decorator(error?: any) {
      return NumberLessThan(threshold, error)
    }
    validateDecorator(decorator, NUMBER_LESS_THAN_MESSAGE(threshold), {
      errorScenario1: faker.datatype.array(),
      errorScenario2: threshold,
      errorScenario3: faker.datatype.number({
        min: threshold,
        max: threshold + 20,
      }),
      errorScenario4: undefined,
      successScenario1: faker.datatype.number({ min: 0, max: threshold - 1 }),
    })
  })

  describe("ArrayType", () => {
    validateDecorator(ArrayType, ARRAY_TYPE_MESSAGE, {
      errorScenario1: JSON.parse(faker.datatype.json()),
      errorScenario2: null,
      errorScenario3: faker.random.word(),
      errorScenario4: faker.datatype.number(),
      successScenario1: faker.datatype.array(),
    })
  })

  describe("IncludedInArray", () => {
    const array = faker.datatype.array(9)
    const item = array[0]
    function decorator(error?: any) {
      return IncludedInArray(array, error)
    }
    validateDecorator(decorator, INCLUDED_IN_ARRAY_MESSAGE(array), {
      errorScenario1: `${item}500`,
      errorScenario2: null,
      errorScenario3: faker.datatype.boolean(),
      errorScenario4: faker.datatype.array(),
      successScenario1: item,
    })
  })

  describe("NotIncludedInArray", () => {
    const array = faker.datatype.array(9)
    function decorator(error?: any) {
      return NotIncludedInArray(array, error)
    }
    validateDecorator(decorator, NOT_INCLUDED_IN_ARRAY_MESSAGE(array), {
      errorScenario1: array[1],
      errorScenario2: array[0],
      errorScenario3: array[5],
      errorScenario4: array[3],
      successScenario1: `${array[0]}500`,
    })
  })

  describe("NumberType", () => {
    validateDecorator(NumberType, NUMBER_TYPE_MESSAGE, {
      errorScenario1: faker.datatype.array(),
      errorScenario2: null,
      errorScenario3: faker.random.word(),
      errorScenario4: faker.datatype.boolean(),
      successScenario1: faker.datatype.number(),
    })
  })

  describe("BooleanType", () => {
    validateDecorator(BooleanType, BOOLEAN_TYPE_MESSAGE, {
      errorScenario1: faker.datatype.array(),
      errorScenario2: null,
      errorScenario3: faker.random.word(),
      errorScenario4: faker.datatype.number(),
      successScenario1: faker.datatype.boolean(),
    })
  })

  describe("JsonString", () => {
    validateDecorator(JsonString, JSON_STRING_MESSAGE, {
      errorScenario1: faker.datatype.number(),
      errorScenario2: null,
      errorScenario3: faker.random.word(),
      errorScenario4: faker.datatype.array(),
      successScenario1: faker.datatype.json(),
    })
  })

  describe("StringMatchingRegex", () => {
    const regex = /^hello$/
    function decorator(error?: any) {
      return StringMatchingRegex(regex, error)
    }

    validateDecorator(decorator, STRING_MATCHING_REGEX_MESSAGE(regex), {
      errorScenario1: "not-hello",
      errorScenario2: null,
      errorScenario3: faker.address.city(),
      errorScenario4: faker.random.words(5),
      successScenario1: "hello",
    })
  })

  describe("NumericString", () => {
    validateDecorator(NumericString, NUMERIC_STRING_MESSAGE, {
      errorScenario1: faker.random.word(),
      errorScenario2: null,
      errorScenario3: "5522d",
      errorScenario4: "d5522",
      successScenario1: "456250",
    })
  })

  describe("AlphanumericString", () => {
    validateDecorator(AlphanumericString, ALPHANUMERIC_STRING_MESSAGE, {
      errorScenario1: "!456250as",
      errorScenario2: "456250as!",
      errorScenario3: faker.datatype.number(),
      errorScenario4: faker.datatype.json(),
      successScenario1: "456250as",
    })
  })

  describe("Integer", () => {
    validateDecorator(Integer, INTEGER_MESSAGE, {
      errorScenario1: faker.datatype.json(),
      errorScenario2: null,
      errorScenario3: faker.datatype.float(),
      errorScenario4: faker.datatype.boolean(),
      successScenario1: 12,
    })
  })

  describe("ArrayOf", () => {
    function decorator(error?: any) {
      return ArrayOf(isString, error)
    }

    validateDecorator(decorator, ARRAY_OF_MESSAGE, {
      errorScenario1: faker.datatype.json(),
      errorScenario2: null,
      errorScenario3: [
        faker.random.word(),
        faker.datatype.json(),
        faker.datatype.number(),
      ],
      errorScenario4: [
        faker.random.word,
        faker.datatype.json(),
        faker.datatype.array(),
      ],
      successScenario1: [
        faker.random.word(),
        faker.datatype.json(),
        faker.name.firstName(),
      ],
    })
  })

  describe("Valid", () => {
    class AnyClass {
      @NumberType()
      anyField?: any

      constructor({ anyField }: any) {
        this.anyField = anyField
      }
    }

    function decorator(error?: any) {
      return Valid(AnyClass, error)
    }

    validateDecorator(decorator, VALID_MESSAGE(AnyClass.name), {
      errorScenario1: { anyField: faker.datatype.boolean() },
      errorScenario2: null,
      errorScenario3: [
        faker.random.word(),
        faker.datatype.json(),
        faker.datatype.number(),
      ],
      errorScenario4: { anyField: faker.datatype.json() },
      successScenario1: { anyField: faker.datatype.number() },
    })
  })

  describe("Enum", () => {
    enum AnyEnum {
      SOME_VALUE = "some-value",
    }

    function decorator(error?: any) {
      return Enum(AnyEnum, error)
    }

    validateDecorator(decorator, ENUM_MESSAGE(AnyEnum), {
      errorScenario1: { anyField: faker.datatype.boolean() },
      errorScenario2: null,
      errorScenario3: faker.random.word(),
      errorScenario4: faker.datatype.number(),
      successScenario1: AnyEnum.SOME_VALUE,
    })
  })

  describe("CustomValidation - Combining validations", () => {
    const successScenario1 = (value: any): boolean =>
      isNotJsonString(value) && isString(value)

    function decorator(error?: any) {
      return CustomValidation(successScenario1, error)
    }

    validateDecorator(decorator, CUSTOM_VALIDATION_MESSAGE, {
      errorScenario1: faker.datatype.number(),
      errorScenario2: null,
      errorScenario3: faker.datatype.json(),
      errorScenario4: faker.datatype.boolean(),
      successScenario1: faker.random.word(),
    })
  })

  describe("CustomValidation - Creating own validation", () => {
    const errorStr = faker.random.word()
    const successScenario1 = (value: any): boolean => !(value === errorStr)

    function decorator(error?: any) {
      return CustomValidation(successScenario1, error)
    }

    validateDecorator(decorator, CUSTOM_VALIDATION_MESSAGE, {
      errorScenario1: errorStr,
      errorScenario2: errorStr,
      errorScenario3: errorStr,
      errorScenario4: errorStr,
      successScenario1: undefined,
    })
  })
})
