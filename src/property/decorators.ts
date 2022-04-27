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
} from "./messages"
import {
  isNotInArray,
  isNotNull,
  isAlphanumericString,
  isArray,
  isBoolean,
  isEmail,
  isInteger,
  isInArray,
  isJsonString,
  isNumber,
  isNumericString,
  isString,
  isStringMatchingRegex,
  isNumberGreaterThan,
  isNumberLessThan,
  isArrayOf,
  isValid,
  isEnum,
} from "./conditions"

import { Constructable, ValidationError } from "../types"
import { validationDecorator } from "./utils"

/**
 * Property validation decorator.
 * Validate if a property is not null when the class is instantiated.
 */
export function NotNull(error?: ValidationError) {
  return validationDecorator(isNotNull, error ?? NOT_NULL_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is a valid email when the class is instantiated.
 */
export function Email(error?: ValidationError) {
  return validationDecorator(isEmail, error ?? EMAIL_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type string when the class is instantiated.
 */
export function StringType(error?: ValidationError) {
  return validationDecorator(isString, error ?? STRING_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type number when the class is instantiated.
 */
export function NumberType(error?: ValidationError) {
  return validationDecorator(isNumber, error ?? NUMBER_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type number and if the number is greater than the given threshold when the class is instantiated.
 */
export function NumberGreaterThan(threshold: number, error?: ValidationError) {
  return validationDecorator(
    isNumberGreaterThan(threshold),
    error ?? NUMBER_GREATER_THAN_MESSAGE(threshold)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is of type number and if the number is less than the given threshold when the class is instantiated.
 */
export function NumberLessThan(threshold: number, error?: ValidationError) {
  return validationDecorator(
    isNumberLessThan(threshold),
    error ?? NUMBER_LESS_THAN_MESSAGE(threshold)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is an array when the class is instantiated.
 */
export function ArrayType(error?: ValidationError) {
  return validationDecorator(isArray, error ?? ARRAY_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is included in a given array when the class is instantiated.
 */
export function IncludedInArray(array: Array<any>, error?: ValidationError) {
  return validationDecorator(
    isInArray(array),
    error ?? INCLUDED_IN_ARRAY_MESSAGE(array)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is not included in a given array when the class is instantiated.
 */
export function NotIncludedInArray(array: Array<any>, error?: ValidationError) {
  return validationDecorator(
    isNotInArray(array),
    error ?? NOT_INCLUDED_IN_ARRAY_MESSAGE(array)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is of type boolean when the class is instantiated.
 */
export function BooleanType(error?: ValidationError) {
  return validationDecorator(isBoolean, error ?? BOOLEAN_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is a valid JSON string when the class is instantiated.
 */
export function JsonString(error?: ValidationError) {
  return validationDecorator(isJsonString, error ?? JSON_STRING_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property value matches a given regex (first parameter) when the class is instantiated.
 */
export function StringMatchingRegex(regex: RegExp, error?: ValidationError) {
  return validationDecorator(
    isStringMatchingRegex(regex),
    error ?? STRING_MATCHING_REGEX_MESSAGE(regex)
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a numeric string when the class is instantiated.
 */
export function NumericString(error?: ValidationError) {
  return validationDecorator(isNumericString, error ?? NUMERIC_STRING_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property value is a alphanumeric string when the class is instantiated.
 */
export function AlphanumericString(error?: ValidationError) {
  return validationDecorator(
    isAlphanumericString,
    error ?? ALPHANUMERIC_STRING_MESSAGE
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a alphanumeric string when the class is instantiated.
 */
export function Integer(error?: ValidationError) {
  return validationDecorator(isInteger, error ?? INTEGER_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property value is array that follows the given success condition when the class is instantiated.
 */
export function ArrayOf(
  successCondition: (item: any) => boolean,
  error?: ValidationError
) {
  return validationDecorator(
    isArrayOf(successCondition),
    error ?? ARRAY_OF_MESSAGE
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a valid schema of another class when the class is instantiated.
 */
export function Valid<T>(
  ValidationClass: Constructable<T>,
  error?: ValidationError
) {
  return validationDecorator(
    isValid<T>(ValidationClass),
    error ?? VALID_MESSAGE(ValidationClass.name)
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a valid enum value when the class is instantiated.
 */
export function Enum(o: object, error?: ValidationError) {
  return validationDecorator(isEnum(o), error ?? ENUM_MESSAGE(o))
}

/**
 * Property validation decorator.
 * Validate a property according to the received condition callback when the class is instantiated.
 */
export function CustomValidation(
  condition: (value: any) => boolean,
  error?: ValidationError
) {
  return validationDecorator(condition, error ?? CUSTOM_VALIDATION_MESSAGE)
}
