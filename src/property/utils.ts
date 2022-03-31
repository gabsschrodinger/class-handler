import {
  CATCH_MANY_PROP,
  ERROR_PROP,
  INSTANCE_ERROR,
  MESSAGES_FIELD_PROP,
} from "../constants";
import {
  getProp,
  getPropValue,
  pushIntoProp,
  setPropSetter,
  setPropValue,
} from "../object";

function processPropValidations(
  propValue: any,
  propValidations: Array<Function>,
  catchMany: boolean
): Array<string> {
  const errorsArray: Array<string> = [];

  for (let i = 0; i < propValidations.length; i++) {
    try {
      propValidations[i](propValue);
    } catch (exception) {
      if (catchMany) {
        errorsArray.push(exception.message);
      } else {
        throw exception;
      }
    }
  }

  return errorsArray;
}

function getValidationSetter(instanceTarget: Object, key: string) {
  return function (value: any): void {
    const propValidations: Array<Function> = getPropValue(
      instanceTarget,
      key + "Validations"
    );
    const catchMany: boolean =
      instanceTarget.constructor.prototype[CATCH_MANY_PROP];

    const errorsArray: Array<string> = processPropValidations(
      value,
      propValidations,
      catchMany
    );

    if (catchMany && errorsArray.length) addErrorToMessages(this, errorsArray);

    this["_" + key] = value;
  };
}

function initValidation(instanceTarget: Object, key: string) {
  if (getProp(instanceTarget, key + "Validations")) return;

  setPropValue(instanceTarget, key + "Validations", [], true, true);

  const newSetter = getValidationSetter(instanceTarget, key);
  setPropSetter(instanceTarget, key, newSetter);
}

function addErrorToMessages(
  instanceTarget: Object,
  errorMessages: Array<string>
) {
  const instanceError: Object = getPropValue(instanceTarget, INSTANCE_ERROR);
  const field: string =
    instanceTarget.constructor.prototype[MESSAGES_FIELD_PROP];
  const errorObj: Object = {
    ...instanceTarget.constructor.prototype[ERROR_PROP],
  };

  const oldMessages: Array<string> = instanceError
    ? instanceError[field]
    : errorObj[field];
  const newMessages = [...oldMessages, ...errorMessages];

  const newErrorObj = { ...instanceError, [field]: newMessages };

  setPropValue(instanceTarget, INSTANCE_ERROR, newErrorObj, true, true);
}

function baseValidation(condition: boolean, error: Object | string | Error) {
  if (condition) {
    if (typeof error === "string" || error instanceof String) {
      throw new Error(error as string);
    }

    throw error;
  }
}

function addValidation(target: any, key: string, validation: Function) {
  pushIntoProp(target, key + "Validations", [validation]);
}

export function validationDecorator(
  condition: (value: any) => boolean,
  error: Object | string | Error
) {
  return function (instanceTarget: Object, key: string): void {
    const validation = (value: any) => baseValidation(condition(value), error);

    initValidation(instanceTarget, key);

    addValidation(instanceTarget, key, validation);
  };
}
