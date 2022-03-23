export function initValidation(target: any, key: string) {
  if (!Object?.getOwnPropertyDescriptor(target, "validations")) {
    Object?.defineProperty(target, "validations", {
      value: [],
      configurable: true,
      writable: true,
    });

    Object?.defineProperty(target, key, {
      set: function (value) {
        const validationsArr = Object?.getOwnPropertyDescriptor(
          target,
          "validations"
        )?.value;

        for (let i = 0; i < validationsArr.length; i++) {
          validationsArr[i](value);
        }

        this["_" + key] = value;
      },
      configurable: true,
    });
  }
}

export function baseValidation(
  condition: boolean,
  error: Object | string | Error
) {
  if (condition) {
    if (typeof error === "string" || error instanceof String) {
      throw new Error(error as string);
    }

    throw error;
  }
}

export function addValidation(target: any, validation: Function) {
  Object?.getOwnPropertyDescriptor(target, "validations")?.value?.push(
    validation
  );
}
