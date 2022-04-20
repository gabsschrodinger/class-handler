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
    try {
      validation(propValue)
    } catch (exception) {
      if (catchMany && exception instanceof Error) {
        errorsArray.push(exception.message)
      } else {
        throw exception
      }
    }
  })

  return errorsArray
}

function addErrorToMessages(instance: Object, errorMessages: Array<string>) {
  const instanceError: Record<string, any> = getPropValue(
    instance,
    INSTANCE_ERROR
  )
  const field: string = instance.constructor.prototype[MESSAGES_FIELD_PROP]
  const errorObj: Record<string, any> = {
    ...instance.constructor.prototype[ERROR_PROP],
  }

  const oldMessages: Array<string> = instanceError
    ? instanceError[field]
    : errorObj[field]
  const newMessages = [...oldMessages, ...errorMessages]

  const newErrorObj = { ...errorObj, [field]: newMessages }

  setPropValue(instance, INSTANCE_ERROR, newErrorObj, {
    configurable: true,
    writable: true,
  })
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

  setPropValue(prototypeTarget, `${key}Validations`, [], {
    configurable: true,
    writable: true,
  })

  const newSetter = getValidationSetter(prototypeTarget, key)
  setPropSetter(prototypeTarget, key, newSetter)
}

function baseValidation(
  errorCondition: boolean,
  error: Object | string | Error
) {
  if (errorCondition) {
    if (typeof error === "string" || error instanceof String) {
      throw new Error(error as string)
    }

    throw error
  }
}

function addValidation(
  prototypeTarget: Object,
  key: string,
  validation: Function
) {
  pushIntoProp(prototypeTarget, `${key}Validations`, [validation])
}

export function validationDecorator(
  errorCondition: (value: any) => boolean,
  error: ValidationError
) {
  return function (prototypeTarget: Object, key: string): void {
    let errorMessage: string
    if (typeof error === "function") {
      errorMessage = error(prototypeTarget.constructor.name, key)
    }

    const validation = (value: any) =>
      baseValidation(errorCondition(value), errorMessage || error)

    initValidation(prototypeTarget, key)

    addValidation(prototypeTarget, key, validation)
  }
}
