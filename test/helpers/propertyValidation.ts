export const validateDecorator = (
  TestedDecorator: Function,
  conditions: Array<any>
) => {
  it("should throw specified error object when it receives an object", () => {
    let exception: any;
    const errorObj = { error: "some error" };

    class Test {
      @TestedDecorator(errorObj)
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(conditions[0] ?? undefined);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(errorObj);
  });

  it("should throw new error with given message when it receives a string", () => {
    let exception: any;
    const errorMessage = "some message";

    class Test {
      @TestedDecorator(errorMessage)
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(conditions[1] ?? undefined);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(errorMessage));
  });

  it("should throw new Error when error is empty", () => {
    let exception: any;

    class Test {
      @TestedDecorator()
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(conditions[2] ?? undefined);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error());
  });

  it("should not throw error when field is filled with a valid input", () => {
    let exception: any;

    class Test {
      @TestedDecorator()
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(conditions[3] ?? undefined);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
};
