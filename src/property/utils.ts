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
      if (catchMany && exception instanceof Error) {
        errorsArray.push(exception.message);
      } else {
        throw exception;
      }
    }
  }

  return errorsArray;
}

function getValidationSetter(
  prototypeTarget: Record<string, any>,
  key: string
) {
  return function (this: Record<string, any>, value: any): void {
    const propValidations: Array<Function> = getPropValue(
      prototypeTarget,
      key + "Validations"
    );
    const catchMany: boolean = prototypeTarget[CATCH_MANY_PROP];

    const errorsArray: Array<string> = processPropValidations(
      value,
      propValidations,
      catchMany
    );

    if (catchMany && errorsArray.length) addErrorToMessages(this, errorsArray);

    setPropValue(this, key, value, true, true, true);
  };
}

function initValidation(prototypeTarget: Object, key: string) {
  if (getProp(prototypeTarget, key + "Validations")) return;

  setPropValue(prototypeTarget, key + "Validations", [], true, true);

  const newSetter = getValidationSetter(prototypeTarget, key);
  setPropSetter(prototypeTarget, key, newSetter);
}

function addErrorToMessages(instance: Object, errorMessages: Array<string>) {
  const instanceError: Record<string, any> = getPropValue(
    instance,
    INSTANCE_ERROR
  );
  const field: string = instance.constructor.prototype[MESSAGES_FIELD_PROP];
  const errorObj: Record<string, any> = {
    ...instance.constructor.prototype[ERROR_PROP],
  };

  const oldMessages: Array<string> = instanceError
    ? instanceError[field]
    : errorObj[field];
  const newMessages = [...oldMessages, ...errorMessages];

  const newErrorObj = { ...errorObj, [field]: newMessages };

  setPropValue(instance, INSTANCE_ERROR, newErrorObj, true, true);
}

function baseValidation(condition: boolean, error: Object | string | Error) {
  if (condition) {
    if (typeof error === "string" || error instanceof String) {
      throw new Error(error as string);
    }

    throw error;
  }
}

function addValidation(
  prototypeTarget: Object,
  key: string,
  validation: Function
) {
  pushIntoProp(prototypeTarget, key + "Validations", [validation]);
}

export function validationDecorator(
  condition: (value: any) => boolean,
  error:
    | Object
    | string
    | Error
    | ((className: string, field: string) => string)
) {
  return function (prototypeTarget: Object, key: string): void {
    let errorMessage: string;
    if (typeof error == "function") {
      errorMessage = error(prototypeTarget.constructor.name, key);
    }

    const validation = (value: any) =>
      baseValidation(condition(value), errorMessage || error);

    initValidation(prototypeTarget, key);

    addValidation(prototypeTarget, key, validation);
  };
}
