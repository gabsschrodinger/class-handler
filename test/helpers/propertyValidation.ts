interface TestConditions {
  errorCondition1: any;
  errorCondition2: any;
  errorCondition3: any;
  successCondition: any;
}

export const validateDecorator = (
  TestedDecorator: Function,
  defaultError: (className: string, field: string) => string,
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

    class SomeClass {
      @TestedDecorator(errorObj)
      someField: any;

      constructor(someField?: any) {
        this.someField = someField;
      }
    }

    try {
      new SomeClass(errorCondition1);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(errorObj);
  });

  it("should throw new error with given message when it receives a string", () => {
    let exception: any;
    const errorMessage = "some message";

    class SomeClass {
      @TestedDecorator(errorMessage)
      someField: any;

      constructor(someField?: any) {
        this.someField = someField;
      }
    }

    try {
      new SomeClass(errorCondition2);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(errorMessage));
  });

  it("should throw default error when error is empty", () => {
    let exception: any;
    const defaultErrorMessage = defaultError("SomeClass", "someField");

    class SomeClass {
      @TestedDecorator()
      someField: any;

      constructor(someField?: any) {
        this.someField = someField;
      }
    }

    try {
      new SomeClass(errorCondition3);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(defaultErrorMessage));
  });

  it("should not throw error when field is filled with a valid input", () => {
    let exception: any;

    class SomeClass {
      @TestedDecorator()
      someField: any;

      constructor(someField?: any) {
        this.someField = someField;
      }
    }

    try {
      new SomeClass(successCondition);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
};
