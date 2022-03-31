import { IS_NULL, NOT_EMAIL, NOT_JSON_STRING, NOT_STRING } from "./conditions";

import { validationDecorator } from "./utils";

/**
 * Validate if a property is not null when the class is instantiated.
 */
export function NotNull(error: Object | string | Error = new Error()) {
  return validationDecorator(IS_NULL, error);
}

/**
 * Validate if a property is a valid email when the class is instantiated.
 */
export function Email(error: Object | string | Error = new Error()) {
  return validationDecorator(NOT_EMAIL, error);
}

/**
 * Validate if a property is of type string when the class is instantiated.
 */
export function StringType(error: Object | string | Error = new Error()) {
  return validationDecorator(NOT_STRING, error);
}

/**
 * Validate if a property is a valid JSON string when the class is instantiated.
 */
export function JsonString(error: Object | string | Error = new Error()) {
  return validationDecorator(NOT_JSON_STRING, error);
}

/**
 * Validate a property according to the received condition callback when the class is instantiated.
 */
export function CustomValidation(
  condition: (value: any) => boolean,
  error: Object | string | Error = new Error()
) {
  return validationDecorator(condition, error);
}
