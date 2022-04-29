import {
  CATCH_MANY_PROP,
  ERROR_PROP,
  INSTANCE_ERROR,
  MESSAGES_FIELD_PROP,
} from "../constants"
import {
  getProp,
  getPropValue,
  pushIntoProp,
  setPropSetter,
  setPropValue,
} from "../object"

import { ValidationError } from "../types"

function processPropValidations(
  propValue: any,
  propValidations: Array<Function>,
  catchMany: boolean
): Array<string> {
  const errorsArray: Array<string> = []

  propValidations.forEach((validation) => {
    const exception = validation(propValue)

    if (catchMany && exception instanceof Error) {
      errorsArray.push(exception.message)
    } else if (exception) {
      throw exception
    }
  })

  return errorsArray
}

function addErrorToMessages(instance: Object, errorMessages: Array<string>) {
  let instanceError: Record<string, any> = getPropValue(
    instance,
    INSTANCE_ERROR
  )

  const field: string = instance.constructor.prototype[MESSAGES_FIELD_PROP]

  if (!instanceError) {
    const errorClone = Object.assign(
      Object.create(
        Object.getPrototypeOf(instance.constructor.prototype[ERROR_PROP])
      ),
      instance.constructor.prototype[ERROR_PROP]
    )
    setPropValue(instance, INSTANCE_ERROR, errorClone)

    instanceError = getPropValue(instance, INSTANCE_ERROR)
  }

  instanceError[field].push(...errorMessages)
}

function getValidationSetter(
  prototypeTarget: Record<string, any>,
  key: string
) {
  return function (this: Record<string, any>, value: any): void {
    const propValidations: Array<Function> = getPropValue(
      prototypeTarget,
      `${key}Validations`
    )
    const catchMany: boolean = getPropValue(prototypeTarget, CATCH_MANY_PROP)

    const errorsArray: Array<string> = processPropValidations(
      value,
      propValidations,
      catchMany
    )

    if (errorsArray.length) addErrorToMessages(this, errorsArray)

    setPropValue(this, key, value, {
      writable: true,
      enumerable: true,
      configurable: true,
    })
  }
}

function initValidation(prototypeTarget: Object, key: string) {
  if (getProp(prototypeTarget, `${key}Validations`)) return

  setPropValue(prototypeTarget, `${key}Validations`, [])

  const newSetter = getValidationSetter(prototypeTarget, key)
  setPropSetter(prototypeTarget, key, newSetter)
}

function baseValidation(successCondition: boolean, error: ValidationError) {
  if (successCondition) {
    return undefined
  }

  if (typeof error === "string" || error instanceof String) {
    return new Error(error as string)
  }

  return error
}

function addValidation(
  prototypeTarget: Object,
  key: string,
  validation: Function
) {
  pushIntoProp(prototypeTarget, `${key}Validations`, [validation])
}

export function validationDecorator(
  successCondition: (value: any) => boolean,
  error: ValidationError
) {
  return function (prototypeTarget: Object, key: string): void {
    let errorMessage: string
    if (typeof error === "function") {
      errorMessage = error(prototypeTarget.constructor.name, key)
    }

    const validation = (value: any) =>
      baseValidation(successCondition(value), errorMessage || error)

    initValidation(prototypeTarget, key)

    addValidation(prototypeTarget, key, validation)
  }
}
