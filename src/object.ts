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
  configurable: boolean,
  writable: boolean,
  enumerable: boolean = false
): void => {
  Object.defineProperty(target, key, {
    value,
    configurable,
    writable,
    enumerable,
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
/* 
export const setPropGetter = (target: Object, key: string): void => {
  Object.defineProperty(target, key, {
    set: function () {
      return this["_" + key + "_"];
    },
    configurable: true,
  });
}; */

export const pushIntoProp = (
  target: Object,
  key: string,
  values: Array<any>
): void => {
  Object.getOwnPropertyDescriptor(target, key)?.value?.push(...values);
};
