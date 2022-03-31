import { CatchMany, NotNull, StringType } from "../src";

import { validateInstance } from "../src/class/utils";

describe("Catch Many", () => {
  it("should not throw errors and keep them in the error obj", () => {
    @CatchMany({ messages: [] }, "messages")
    class Manoo {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    let exception: any;

    try {
      new Manoo();
    } catch (error) {
      exception = "falhjhaaaaa";
    }

    expect(exception).toBeUndefined();
  });

  it("should throw errors when validate class is called", () => {
    @CatchMany({ messages: [] }, "messages")
    class Manoo {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const instance = new Manoo();

    let exception: any;

    try {
      validateInstance(instance);
    } catch (error) {
      exception = error;
    }

    expect(exception).toEqual({ messages: ["string type", "not null"] });
  });

  it("should not thorw error from one instance for another", () => {
    @CatchMany({ messages: [] }, "messages")
    class Manoo {
      @NotNull("not null")
      @StringType("string type")
      anyField: any;

      constructor(anyField?: any) {
        this.anyField = anyField;
      }
    }

    const anotherInstance = new Manoo("haha");
    new Manoo();

    let exception: any;

    try {
      validateInstance(anotherInstance);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeUndefined();
  });
});
