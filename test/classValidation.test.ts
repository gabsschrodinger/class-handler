import {
  CATCH_MANY_PROP,
  ERROR_PROP,
  MESSAGES_FIELD_PROP,
} from "../src/constants";
import { CatchMany, NotNull, StringType } from "../src";

import { getProp } from "../src/object";
import { validateInstance } from "../src/class/utils";

describe("Catch Many", () => {
  it("should not throw errors and keep them in the error object", () => {
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

    const anyFieldProp = getProp(instance, "anyField");

    expect(anyFieldProp.writable).toBeTruthy();
    expect(anyFieldProp.configurable).toBeTruthy();
    expect(anyFieldProp.writable).toBeTruthy();
  });

  it("should create prototype fields with the minimum permission they need", () => {
    @CatchMany({ messages: [] }, "messages")
    class SomeClass {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const catchMany = getProp(SomeClass.prototype, CATCH_MANY_PROP);
    const messagesField = getProp(SomeClass.prototype, MESSAGES_FIELD_PROP);
    const error = getProp(SomeClass.prototype, ERROR_PROP);

    expect(catchMany.configurable).toBeFalsy();
    expect(messagesField.configurable).toBeFalsy();
    expect(error.configurable).toBeFalsy();

    expect(catchMany.enumerable).toBeFalsy();
    expect(messagesField.enumerable).toBeFalsy();
    expect(error.enumerable).toBeFalsy();

    expect(catchMany.writable).toBeFalsy();
    expect(messagesField.writable).toBeFalsy();
    expect(error.writable).toBeFalsy();
  });
});
