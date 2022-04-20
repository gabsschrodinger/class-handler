import { INSTANCE_ERROR, MESSAGES_FIELD_PROP } from "../constants"

import { getPropValue } from "../object"

export const validateInstance = (instance: Object) => {
  const error = getPropValue(instance, INSTANCE_ERROR)

  const errorMessagesField = instance.constructor.prototype[MESSAGES_FIELD_PROP]

  if (error && error[errorMessagesField].length) {
    throw error
  }
}
