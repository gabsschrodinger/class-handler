import { CatchMany, NotNull, StringType } from "../src";

import { validateInstance } from "../src/class/utils";

describe("Catch Many", () => {
  it("should not throw errors and keep them in the error obj", () => {
    @CatchMany({ messages: [] }, "messages")
    class SomeClass {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    let exception: any;

    try {
      new SomeClass();
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });

  it("should throw errors when validate class is called", () => {
    @CatchMany({ errorCode: 400, messages: [] }, "messages")
    class SomeClass {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const instance = new SomeClass();

    let exception: any;

    try {
      validateInstance(instance);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual({
      errorCode: 400,
      messages: ["string type", "not null"],
    });
  });

  it("should not thorw error from one instance for another", () => {
    @CatchMany({ messages: [] }, "messages")
    class SomeClass {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const anotherInstance = new SomeClass("haha");
    new SomeClass();

    let exception: any;

    try {
      validateInstance(anotherInstance);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });

  it("should not thorw errors when decorators dont find any", () => {
    @CatchMany({ messages: [] }, "messages")
    class SomeClass {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const instance = new SomeClass("some-text");

    let exception: any;

    try {
      validateInstance(instance);
    } catch (_error) {
      exception = "error";
    }

    expect(exception).toBeUndefined();
    expect(instance.anyField).toEqual("some-text");
  });
});
