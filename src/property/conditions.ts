import validator from "validator"
import { validateInstance } from "../class/utils"
import { Constructable } from "../types"

export function isString(value: any): boolean {
  return typeof value === "string"
}

export function isEmail(value: any): boolean {
  return isString(value) && validator.isEmail(value)
}

export function isNumber(value: any): boolean {
  return typeof value === "number"
}

export function isNumberGreaterThan(threshold: number) {
  return function (value: any): boolean {
    return isNumber(value) && value > threshold
  }
}

export function isNumberLessThan(threshold: number) {
  return function (value: any): boolean {
    return isNumber(value) && value < threshold
  }
}

export function isBoolean(value: any): boolean {
  return typeof value === "boolean"
}

export function isNotNull(value: any): boolean {
  return value !== null && value !== undefined && value !== ""
}

export function isObject(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value) && value !== null
}

export function isNotObject(value: any): boolean {
  return !isObject(value)
}

export function isNotJsonString(value: any): boolean {
  try {
    const parsed = JSON.parse(value)
    return isNotObject(parsed)
  } catch (_error) {
    return true
  }
}

export function isJsonString(value: any): boolean {
  return !isNotJsonString(value)
}

export function isArray(value: any): boolean {
  return Array.isArray(value)
}

export function isArrayOf(itemsSuccessCondition: (item: any) => boolean) {
  return function (value: any) {
    return isArray(value) && value.every(itemsSuccessCondition)
  }
}

export function isNotInArray(arr: Array<any>) {
  return function (value: any): boolean {
    return !arr.includes(value)
  }
}

export function isInArray(arr: Array<any>) {
  return function (value: any): boolean {
    return arr.includes(value)
  }
}

export function isStringMatchingRegex(regex: RegExp) {
  return function (value: any): boolean {
    return isString(value) && regex.test(value)
  }
}

export function isNumericString(value: any): boolean {
  return isStringMatchingRegex(/^\d+$/)(value)
}

export function isAlphanumericString(value: any): boolean {
  return isStringMatchingRegex(/^[a-z\d]+$/i)(value)
}

export function isInteger(value: any): boolean {
  return Number.isInteger(value)
}

export function isValid<T>(ValidationClass: Constructable<T>) {
  return function (value: any): boolean {
    try {
      const instance = new ValidationClass(value)
      validateInstance(instance)

      return true
    } catch (_) {
      return false
    }
  }
}

export function isEnum(o: object) {
  return function (value: any): boolean {
    return Object.values(o).includes(value)
  }
}
