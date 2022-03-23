import { Email } from "../src";
import { faker } from "@faker-js/faker";

describe("Email", () => {
  it("should throw specified error object when it receives an object", () => {
    let exception: any;
    const errorObj = { error: "some error" };

    class Test {
      @Email(errorObj)
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.random.word());
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(errorObj);
  });

  it("should throw new error with given message when it receives a string", () => {
    let exception: any;
    const errorMessage = "some message";

    class Test {
      @Email(errorMessage)
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.random.word());
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(errorMessage));
  });

  it("should throw new Error when error is empty", () => {
    let exception: any;

    class Test {
      @Email()
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.random.word());
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error());
  });

  it("should not throw error when field is with valid email", () => {
    let exception: any;

    class Test {
      @Email()
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.internet.email());
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
});
