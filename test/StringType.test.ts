import { StringType } from "../src";
import { faker } from "@faker-js/faker";

describe("StringType", () => {
  it("should throw specified error object when it receives an object", () => {
    let exception: any;
    const errorObj = { error: "some error" };

    class Test {
      @StringType(errorObj)
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.datatype.number(10));
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(errorObj);
  });

  it("should throw new error with given message when it receives a string", () => {
    let exception: any;
    const errorMessage = "some message";

    class Test {
      @StringType(errorMessage)
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.datatype.boolean());
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error(errorMessage));
  });

  it("should throw new Error when error is empty", () => {
    let exception: any;

    class Test {
      @StringType()
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(JSON.parse(faker.datatype.json()));
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual(new Error());
  });

  it("should not throw error when field is with string", () => {
    let exception: any;

    class Test {
      @StringType()
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    try {
      new Test(faker.random.word());
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
});
