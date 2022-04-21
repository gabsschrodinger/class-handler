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
} from "./conditions"

import { ValidationError } from "../types"
import { validationDecorator } from "./utils"

/**
 * Property validation decorator.
 * Validate if a property is not null when the class is instantiated.
 */
export function NotNull(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isNotNull, error ?? NOT_NULL_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is a valid email when the class is instantiated.
 */
export function Email(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isEmail, error ?? EMAIL_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type string when the class is instantiated.
 */
export function StringType(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isString, error ?? STRING_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type number when the class is instantiated.
 */
export function NumberType(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isNumber, error ?? NUMBER_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is of type number and if the number is greater than the given threshold when the class is instantiated.
 */
export function NumberGreaterThan(
  threshold: number,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(
    isNumberGreaterThan(threshold),
    error ?? NUMBER_GREATER_THAN_MESSAGE(threshold)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is of type number and if the number is less than the given threshold when the class is instantiated.
 */
export function NumberLessThan(
  threshold: number,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(
    isNumberLessThan(threshold),
    error ?? NUMBER_LESS_THAN_MESSAGE(threshold)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is an array when the class is instantiated.
 */
export function ArrayType(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isArray, error ?? ARRAY_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is included in a given array when the class is instantiated.
 */
export function IncludedInArray(
  array: Array<any>,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(
    isInArray(array),
    error ?? INCLUDED_IN_ARRAY_MESSAGE(array)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is not included in a given array when the class is instantiated.
 */
export function NotIncludedInArray(
  array: Array<any>,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(
    isNotInArray(array),
    error ?? NOT_INCLUDED_IN_ARRAY_MESSAGE(array)
  )
}

/**
 * Property validation decorator.
 * Validate if a property is of type boolean when the class is instantiated.
 */
export function BooleanType(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isBoolean, error ?? BOOLEAN_TYPE_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property is a valid JSON string when the class is instantiated.
 */
export function JsonString(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isJsonString, error ?? JSON_STRING_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property value matches a given regex (first parameter) when the class is instantiated.
 */
export function StringMatchingRegex(
  regex: RegExp,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(
    isStringMatchingRegex(regex),
    error ?? STRING_MATCHING_REGEX_MESSAGE(regex)
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a numeric string when the class is instantiated.
 */
export function NumericString(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isNumericString, error ?? NUMERIC_STRING_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate if a property value is a alphanumeric string when the class is instantiated.
 */
export function AlphanumericString(error?: ValidationError): PropertyDecorator {
  return validationDecorator(
    isAlphanumericString,
    error ?? ALPHANUMERIC_STRING_MESSAGE
  )
}

/**
 * Property validation decorator.
 * Validate if a property value is a alphanumeric string when the class is instantiated.
 */
export function Integer(error?: ValidationError): PropertyDecorator {
  return validationDecorator(isInteger, error ?? INTEGER_MESSAGE)
}

/**
 * Property validation decorator.
 * Validate a property according to the received condition callback when the class is instantiated.
 */
export function CustomValidation(
  condition: (value: any) => boolean,
  error?: ValidationError
): PropertyDecorator {
  return validationDecorator(condition, error ?? CUSTOM_VALIDATION_MESSAGE)
}
