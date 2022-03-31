import validator from "validator";

export const NOT_EMAIL = (value: any): boolean => {
  try {
    return !validator.isEmail(value);
  } catch (_error) {
    return true;
  }
};

export const NOT_STRING = (value: any): boolean =>
  !(typeof value == "string" || value instanceof String);

export const IS_NULL = (value: any): boolean =>
  value === null || value === undefined || value === "";

export const IS_OBJECT = (value: any): boolean =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const IS_JSON_STRING = (value: any): boolean => {
  try {
    const parsed = JSON.parse(value);
    return IS_OBJECT(parsed);
  } catch (_error) {
    return false;
  }
};

export const NOT_JSON_STRING = (value: any): boolean => !IS_JSON_STRING(value);

export const IS_IN_ARRAY =
  (arr: Array<any>) =>
  (value: any): boolean =>
    arr.includes(value);

export const NOT_IN_ARRAY =
  (arr: Array<any>) =>
  (value: any): boolean =>
    !arr.includes(value);
