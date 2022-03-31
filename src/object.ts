export const getProp = (
  instanceTarget: Object,
  key: string
): PropertyDescriptor => Object.getOwnPropertyDescriptor(instanceTarget, key);

export const getPropValue = (instanceTarget: Object, key: string): any =>
  getProp(instanceTarget, key)?.value;

export const setPropValue = (
  instanceTarget: Object,
  key: string,
  value: any,
  configurable: boolean = false,
  writable: boolean = false
): void => {
  Object.defineProperty(instanceTarget, key, {
    value,
    configurable,
    writable,
  });
};

export const setPropSetter = (
  instanceTarget: Object,
  key: string,
  setter: (value: any) => void
): void => {
  Object.defineProperty(instanceTarget, key, {
    set: setter,
    configurable: true,
  });
};

export const pushIntoProp = (
  instanceTarget: Object,
  key: string,
  values: Array<any>
): void => {
  Object.getOwnPropertyDescriptor(instanceTarget, key)?.value?.push(...values);
};
