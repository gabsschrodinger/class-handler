import { INSTANCE_ERROR, MESSAGES_FIELD_PROP } from "../constants";

import { getPropValue } from "../object";

export const validateInstance = (instanceTarget: Object) => {
  const error = getPropValue(instanceTarget, INSTANCE_ERROR);

  const errorMessagesField =
    instanceTarget.constructor.prototype[MESSAGES_FIELD_PROP];

  if (error && error[errorMessagesField].length) {
    throw error;
  }
};
