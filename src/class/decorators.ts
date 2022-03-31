import {
  CATCH_MANY_PROP,
  ERROR_PROP,
  MESSAGES_FIELD_PROP,
} from "./../constants";

export function CatchMany(errorObj: Object, messagesField: string) {
  return function (parentTarget: Function) {
    parentTarget.prototype[CATCH_MANY_PROP] = true;
    parentTarget.prototype[MESSAGES_FIELD_PROP] = messagesField;
    parentTarget.prototype[ERROR_PROP] = errorObj;
  };
}
