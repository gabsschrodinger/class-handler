function initValidation(target: any, key: string) {
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

function baseValidation(condition: boolean, error: Object | string | Error) {
  if (condition) {
    if (typeof error === "string" || error instanceof String) {
      throw new Error(error as string);
    }

    throw error;
  }
}

function addValidation(target: any, validation: Function) {
  Object?.getOwnPropertyDescriptor(target, "validations")?.value?.push(
    validation
  );
}

export function validationDecorator(
  condition: (value: any) => boolean,
  error: Object | string | Error
) {
  return function (target: any, key: string): void {
    const validation = (value: any) => baseValidation(condition(value), error);

    initValidation(target, key);

    addValidation(target, validation);
  };
}
