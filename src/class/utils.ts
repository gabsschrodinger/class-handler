import { INSTANCE_ERROR, MESSAGES_FIELD_PROP } from "../constants"

import { getPropValue } from "../object"

export const getInstanceErrors = (instance: Object) => {
  const error = getPropValue(instance, INSTANCE_ERROR)

  const errorMessagesField = instance.constructor.prototype[MESSAGES_FIELD_PROP]

  return error && error[errorMessagesField].length ? error : undefined
}

export const validateInstance = (instance: Object): void => {
  const error = getInstanceErrors(instance)

  if (error) {
    throw error
  }
}
