import { NotNull } from "../src";

describe("app", () => {
  it("should throw specified error", () => {
    class Test {
      @NotNull({ error: "some error" })
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    expect(() => new Test()).toThrowError();
  });

  it("should throw new Error when error is empty", () => {
    class Test {
      @NotNull({ error: "some error" })
      anyField: string;

      constructor(anyField?: string) {
        this.anyField = anyField;
      }
    }

    expect(() => new Test()).toThrowError();
  });
});
