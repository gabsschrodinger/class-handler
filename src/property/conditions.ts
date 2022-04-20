/* eslint-disable @typescript-eslint/naming-convention */
import validator from "validator"

export function NOT_EMAIL(value: any): boolean {
  try {
    return !validator.isEmail(value)
  } catch (_error) {
    return true
  }
}

export function NOT_STRING(value: any): boolean {
  return !(typeof value === "string" || value instanceof String)
}

export function NOT_NUMBER(value: any): boolean {
  return !(typeof value === "number" || value instanceof Number)
}

export function NUMBER_LESS_OR_EQUAL_THAN(threshold: number) {
  return (value: any): boolean => NOT_NUMBER(value) || value <= threshold
}

export function NUMBER_GREATER_OR_EQUAL_THAN(threshold: number) {
  return (value: any): boolean => NOT_NUMBER(value) || value >= threshold
}

export function NOT_BOOLEAN(value: any): boolean {
  return !(typeof value === "boolean" || value instanceof Boolean)
}

export function IS_NULL(value: any): boolean {
  return value === null || value === undefined || value === ""
}

export function IS_OBJECT(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value) && value !== null
}

export function IS_JSON_STRING(value: any): boolean {
  try {
    const parsed = JSON.parse(value)
    return IS_OBJECT(parsed)
  } catch (_error) {
    return false
  }
}

export function NOT_JSON_STRING(value: any): boolean {
  return !IS_JSON_STRING(value)
}

export function NOT_ARRAY(value: any): boolean {
  return !Array.isArray(value)
}

export function IS_IN_ARRAY(arr: Array<any>) {
  return (value: any): boolean => arr.includes(value)
}

export function NOT_IN_ARRAY(arr: Array<any>) {
  return (value: any): boolean => !arr.includes(value)
}

export function NOT_STRING_MATCHING_REGEX(regex: RegExp) {
  return (value: any): boolean => NOT_STRING(value) || !regex.test(value)
}

export function NOT_NUMERIC_STRING(value: any) {
  return NOT_STRING_MATCHING_REGEX(/^\d+$/)(value)
}

export function NOT_ALPHANUMERIC_STRING(value: any) {
  return NOT_STRING_MATCHING_REGEX(/^[a-z\d]+$/i)(value)
}

export function NOT_INTEGER(value: any) {
  return NOT_NUMBER(value) || !Number.isInteger(value)
}
