export const NOT_NULL_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} can't be null`

export const EMAIL_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be a valid email`

export const STRING_TYPE_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be a string`

export const NUMBER_TYPE_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be a number`

export const NUMBER_GREATER_THAN_MESSAGE =
  (threshold: number) => (className: string, field: string) =>
    `Field ${field} of ${className} must be a number greater than ${threshold}`

export const NUMBER_LESS_THAN_MESSAGE =
  (threshold: number) => (className: string, field: string) =>
    `Field ${field} of ${className} must be a number less than ${threshold}`

export const ARRAY_TYPE_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be an array`

export const INCLUDED_IN_ARRAY_MESSAGE =
  (array: Array<any>) => (className: string, field: string) =>
    `Field ${field} of ${className} must be an item of array ${array}`

export const NOT_INCLUDED_IN_ARRAY_MESSAGE =
  (array: Array<any>) => (className: string, field: string) =>
    `Field ${field} of ${className} can't be an item of array ${array}`

export const BOOLEAN_TYPE_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be a boolean`

export const JSON_STRING_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must a JSON string`

export const CUSTOM_VALIDATION_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} received an invalid input`

export const STRING_MATCHING_REGEX_MESSAGE =
  (regex: RegExp) => (className: string, field: string) =>
    `Field ${field} of ${className} must match ${regex} regex`

export const NUMERIC_STRING_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be a numeric string`

export const ALPHANUMERIC_STRING_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be an alphanumeric string`

export const INTEGER_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} must be an integer`

export const ARRAY_OF_MESSAGE = (className: string, field: string) =>
  `Field ${field} of ${className} is not a valid array`

export const VALID_MESSAGE =
  (validationClass: string) => (className: string, field: string) =>
    `Field ${field} of ${className} is not a valid ${validationClass}`

export const ENUM_MESSAGE = (o: object) => (className: string, field: string) =>
  `Field ${field} of ${className} is not a valid values (${Object.values(
    o
  ).join()})`
