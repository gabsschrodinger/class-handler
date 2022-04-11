import { PropConfig } from "./types";

export const getProp = (
  target: Object,
  key: string
): PropertyDescriptor | undefined =>
  Object.getOwnPropertyDescriptor(target, key);

export const getPropValue = (target: Object, key: string): any =>
  getProp(target, key)?.value;

export const setPropValue = (
  target: Object,
  key: string,
  value: any,
  config?: PropConfig
): void => {
  Object.defineProperty(target, key, {
    value,
    ...config,
  });
};

export const setPropSetter = (
  target: Object,
  key: string,
  setter: (value: any) => void
): void => {
  Object.defineProperty(target, key, {
    set: setter,
    configurable: true,
  });
};

export const pushIntoProp = (
  target: Object,
  key: string,
  values: Array<any>
): void => {
  const arrayProperty = getPropValue(target, key);

  if (!Array.isArray(arrayProperty)) {
    throw new Error(
      `Cannot push values into prop because property ${key} is not an array`
    );
  }

  arrayProperty.push(...values);
};
