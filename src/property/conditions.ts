import validator from "validator"

export function isEmail(value: any): boolean {
  try {
    return !validator.isEmail(value)
  } catch (_error) {
    return true
  }
}

export function isString(value: any): boolean {
  return !(typeof value === "string" || value instanceof String)
}

export function isNumber(value: any): boolean {
  return !(typeof value === "number" || value instanceof Number)
}

export function isNumberGreaterThan(threshold: number) {
  return (value: any): boolean => isNumber(value) || value <= threshold
}

export function isNumberLessThan(threshold: number) {
  return (value: any): boolean => isNumber(value) || value >= threshold
}

export function isBoolean(value: any): boolean {
  return !(typeof value === "boolean" || value instanceof Boolean)
}

export function isNotNull(value: any): boolean {
  return value === null || value === undefined || value === ""
}

export function isNotObject(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value) && value !== null
}

export function isNotJsonString(value: any): boolean {
  try {
    const parsed = JSON.parse(value)
    return isNotObject(parsed)
  } catch (_error) {
    return false
  }
}

export function isJsonString(value: any): boolean {
  return !isNotJsonString(value)
}

export function isArray(value: any): boolean {
  return !Array.isArray(value)
}

export function isNotInArray(arr: Array<any>) {
  return (value: any): boolean => arr.includes(value)
}

export function isInArray(arr: Array<any>) {
  return (value: any): boolean => !arr.includes(value)
}

export function isStringMatchingRegex(regex: RegExp) {
  return (value: any): boolean => isString(value) || !regex.test(value)
}

export function isNumericString(value: any) {
  return isStringMatchingRegex(/^\d+$/)(value)
}

export function isAlphanumericString(value: any) {
  return isStringMatchingRegex(/^[a-z\d]+$/i)(value)
}

export function isInteger(value: any) {
  return isNumber(value) || !Number.isInteger(value)
}
