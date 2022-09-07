import validator from "validator"
import { validateInstance } from "../class/utils"
import { Condition, Constructable } from "../types"

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isEmail(value: unknown): value is string {
  if (isString(value)) {
    return validator.isEmail(value)
  }
  return false
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

export function isNumberGreaterThan(threshold: number) {
  return function (value: unknown): value is number {
    return isNumber(value) && value > threshold
  }
}

export function isNumberLessThan(threshold: number) {
  return function (value: unknown): value is number {
    return isNumber(value) && value < threshold
  }
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean"
}

export function isNotNull(value: unknown): boolean {
  return value !== null && value !== undefined && value !== ""
}

export function isObject(value: unknown): value is object {
  return typeof value === "object" && !Array.isArray(value) && value !== null
}

export function isNotObject(value: unknown): boolean {
  return !isObject(value)
}

export function isJsonString(value: unknown): value is string {
  try {
    if (isString(value)) {
      return isObject(JSON.parse(value))
    }

    return false
  } catch (_) {
    return false
  }
}

export function isNotJsonString(value: unknown): boolean {
  return !isJsonString(value)
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

export function isArrayOf(itemsSuccessCondition: Condition) {
  return function (value: unknown) {
    return isArray(value) && value.every(itemsSuccessCondition)
  }
}

export function isNotInArray(array: Array<unknown>) {
  return function (value: unknown): boolean {
    return !array.includes(value)
  }
}

export function isInArray(array: Array<unknown>) {
  return function (value: unknown): boolean {
    return array.includes(value)
  }
}

export function isStringMatchingRegex(regex: RegExp) {
  return function (value: unknown): value is string {
    return isString(value) && regex.test(value)
  }
}

export function isNumericString(value: unknown): value is string {
  return isStringMatchingRegex(/^\d+$/)(value)
}

export function isAlphanumericString(value: unknown): value is string {
  return isStringMatchingRegex(/^[a-z\d]+$/i)(value)
}

export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

export function isNestedObject<T extends object>(
  ObjectConstructor: Constructable<T>
) {
  return function (value: unknown): boolean {
    try {
      const instance = new ObjectConstructor(value)
      validateInstance(instance)

      return true
    } catch (_) {
      return false
    }
  }
}

export function isEnum(o: object) {
  return function (value: unknown): boolean {
    return Object.values(o).includes(value)
  }
}
