import {
  CATCH_MANY_PROP,
  ERROR_PROP,
  MESSAGES_FIELD_PROP,
} from "./../constants";

import { setPropValue } from "../object";

export function CatchMany(errorObj: Object, messagesField: string) {
  return function (parentTarget: Function) {
    setPropValue(parentTarget.prototype, CATCH_MANY_PROP, true);

    setPropValue(parentTarget.prototype, MESSAGES_FIELD_PROP, messagesField);

    setPropValue(parentTarget.prototype, ERROR_PROP, errorObj);
  };
}
