import {
  ARRAY_TYPE_MESSAGE,
  BOOLEAN_TYPE_MESSAGE,
  CUSTOM_VALIDATION_MESSAGE,
  EMAIL_MESSAGE,
  INCLUDED_IN_ARRAY_MESSAGE,
  JSON_STRING_MESSAGE,
  NOT_INCLUDED_IN_ARRAY_MESSAGE,
  NOT_NULL_MESSAGE,
  NUMBER_GREATER_THAN_MESSAGE,
  NUMBER_LESS_THAN_MESSAGE,
  NUMBER_TYPE_MESSAGE,
  STRING_TYPE_MESSAGE,
} from "./messages";
import {
  IS_IN_ARRAY,
  IS_NULL,
  NOT_ARRAY,
  NOT_BOOLEAN,
  NOT_EMAIL,
  NOT_IN_ARRAY,
  NOT_JSON_STRING,
  NOT_NUMBER,
  NOT_STRING,
  NUMBER_GREATER_OR_EQUAL_THAN,
  NUMBER_LESS_OR_EQUAL_THAN,
} from "./conditions";

import { validationDecorator } from "./utils";

/**
 * Validate if a property is not null when the class is instantiated.
 */
export function NotNull(error?: Object | string | Error) {
  return validationDecorator(IS_NULL, error ?? NOT_NULL_MESSAGE);
}

/**
 * Validate if a property is a valid email when the class is instantiated.
 */
export function Email(error?: Object | string | Error) {
  return validationDecorator(NOT_EMAIL, error ?? EMAIL_MESSAGE);
}

/**
 * Validate if a property is of type string when the class is instantiated.
 */
export function StringType(error?: Object | string | Error) {
  return validationDecorator(NOT_STRING, error ?? STRING_TYPE_MESSAGE);
}

/**
 * Validate if a property is of type number when the class is instantiated.
 */
export function NumberType(error?: Object | string | Error) {
  return validationDecorator(NOT_NUMBER, error ?? NUMBER_TYPE_MESSAGE);
}

/**
 * Validate if a property is of type number and if the number is greater than the given threshold when the class is instantiated.
 */
export function NumberGreaterThan(
  threshold: number,
  error?: Object | string | Error
) {
  return validationDecorator(
    NUMBER_LESS_OR_EQUAL_THAN(threshold),
    error ?? NUMBER_GREATER_THAN_MESSAGE(threshold)
  );
}

/**
 * Validate if a property is of type number and if the number is less than the given threshold when the class is instantiated.
 */
export function NumberLessThan(
  threshold: number,
  error?: Object | string | Error
) {
  return validationDecorator(
    NUMBER_GREATER_OR_EQUAL_THAN(threshold),
    error ?? NUMBER_LESS_THAN_MESSAGE(threshold)
  );
}

/**
 * Validate if a property is an array when the class is instantiated.
 */
export function ArrayType(error?: Object | string | Error) {
  return validationDecorator(NOT_ARRAY, error ?? ARRAY_TYPE_MESSAGE);
}

/**
 * Validate if a property is included in a given array when the class is instantiated.
 */
export function IncludedInArray(
  array: Array<any>,
  error?: Object | string | Error
) {
  return validationDecorator(
    NOT_IN_ARRAY(array),
    error ?? INCLUDED_IN_ARRAY_MESSAGE(array)
  );
}

/**
 * Validate if a property is not included in a given array when the class is instantiated.
 */
export function NotIncludedInArray(
  array: Array<any>,
  error?: Object | string | Error
) {
  return validationDecorator(
    IS_IN_ARRAY(array),
    error ?? NOT_INCLUDED_IN_ARRAY_MESSAGE(array)
  );
}

/**
 * Validate if a property is of type boolean when the class is instantiated.
 */
export function BooleanType(error?: Object | string | Error) {
  return validationDecorator(NOT_BOOLEAN, error ?? BOOLEAN_TYPE_MESSAGE);
}

/**
 * Validate if a property is a valid JSON string when the class is instantiated.
 */
export function JsonString(error?: Object | string | Error) {
  return validationDecorator(NOT_JSON_STRING, error ?? JSON_STRING_MESSAGE);
}

/**
 * Validate a property according to the received condition callback when the class is instantiated.
 */
export function CustomValidation(
  condition: (value: any) => boolean,
  error?: Object | string | Error
) {
  return validationDecorator(condition, error ?? CUSTOM_VALIDATION_MESSAGE);
}
