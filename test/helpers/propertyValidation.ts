interface TestConditions {
  errorCondition1: any;
  errorCondition2: any;
  errorCondition3: any;
  successCondition: any;
}

export const validateDecorator = (
  TestedDecorator: Function,
  {
    errorCondition1,
    errorCondition2,
    errorCondition3,
    successCondition,
  }: TestConditions
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
      new Test(errorCondition1);
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
      new Test(errorCondition2);
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
      new Test(errorCondition3);
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
      new Test(successCondition);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
};
