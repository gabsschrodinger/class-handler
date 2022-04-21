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
  let instanceError = getPropValue(instance, INSTANCE_ERROR)

  const field: string = instance.constructor.prototype[MESSAGES_FIELD_PROP]

  const errorObj = instance.constructor.prototype[ERROR_PROP]

  if (!instanceError) {
    setPropValue(
      instance,
      INSTANCE_ERROR,
      { ...errorObj },
      {
        configurable: true,
        writable: true,
      }
    )

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

  setPropValue(prototypeTarget, `${key}Validations`, [], {
    configurable: true,
    writable: true,
  })

  const newSetter = getValidationSetter(prototypeTarget, key)
  setPropSetter(prototypeTarget, key, newSetter)
}

function baseValidation(
  successCondition: boolean,
  error: Object | string | Error
): void {
  if (successCondition) {
    return
  }

  if (typeof error === "string" || error instanceof String) {
    throw new Error(error as string)
  }

  throw error
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
): PropertyDecorator {
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
