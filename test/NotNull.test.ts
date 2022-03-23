import { NotNull } from "../src";

describe("NotNull", () => {
  it("should throw specified error object when it receives an object", () => {
    let exception: any;
    const errorObj = { error: "some error" };

    class Test {
      @NotNull(errorObj)
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test();
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(errorObj);
  });

  it("should throw new error with given message when it receives a string", () => {
    let exception: any;
    const errorMessage = "some message";

    class Test {
      @NotNull(errorMessage)
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test();
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(errorMessage));
  });

  it("should throw new Error when error is empty", () => {
    let exception: any;

    class Test {
      @NotNull()
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test();
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error());
  });

  it("should not throw error when field is not empty", () => {
    let exception: any;

    class Test {
      @NotNull()
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test("any");
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
});
