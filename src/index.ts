import { addValidation, baseValidation, initValidation } from "./utils";

import validator from "validator";

export function NotNull(error: Object | string | Error = new Error()) {
  return function (target: any, key: string): void {
    const validateNotNull = (next: any) =>
      baseValidation(next === null || next === undefined || next === "", error);

    initValidation(target, key);

    addValidation(target, validateNotNull);
  };
}

export function Email(error: Object | string | Error = new Error()) {
  return function (target: any, key: string): void {
    const validateEmail = (next: any) =>
      baseValidation(!validator.isEmail(next), error);

    initValidation(target, key);

    addValidation(target, validateEmail);
  };
}

export function StringType(error: Object | string | Error = new Error()) {
  return function (target: any, key: string): void {
    const validateStringType = (next: any) =>
      baseValidation(
        !(typeof next == "string" || next instanceof String),
        error
      );

    initValidation(target, key);

    addValidation(target, validateStringType);
  };
}
