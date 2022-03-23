export function NotNull(error: any = new Error()) {
  return function (target: any, key: string): void {
    let value: any = target[key];

    const setter = (next: any) => {
      if (value === null || value === undefined || value === "") {
        throw error;
      }

      value = next;
    };

    Object.defineProperty(target, key, {
      set: setter,
    });
  };
}
