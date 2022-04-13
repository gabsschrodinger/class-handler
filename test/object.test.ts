import faker from "@faker-js/faker";
import {
  getProp,
  getPropValue,
  pushIntoProp,
  setPropSetter,
  setPropValue,
} from "../src/object";

import { PropConfig } from "../src/types";

describe("Object handling utils", () => {
  const someObject = {
    someField: faker.random.word(),
  };

  const FIELD = "someField";

  describe("get prop", () => {
    it("should return the given object property", () => {
      const result = getProp(someObject, FIELD);
      const property = Object.getOwnPropertyDescriptor(someObject, FIELD);

      expect(result).toEqual(property);
    });
  });

  describe("get prop value", () => {
    it("should return value of get prop result", () => {
      const result = getPropValue(someObject, FIELD);
      const propValue = getProp(someObject, FIELD).value;

      expect(result).toEqual(propValue);
    });

    it("should return undefined when prop is undefined", () => {
      const result = getPropValue(someObject, FIELD + faker.random.word());

      expect(result).toBeUndefined();
    });
  });

  describe("set prop value", () => {
    it("should set prop with minimum permission when not specified", () => {
      const defineSpy = jest
        .spyOn(Object, "defineProperty")
        .mockImplementationOnce(() => {});

      const someValue = faker.random.word();

      setPropValue(someObject, FIELD, someValue);

      expect(defineSpy).toHaveBeenCalledWith(someObject, FIELD, {
        value: someValue,
      });
    });

    it.each([
      [{ configurable: true }],
      [{ writable: true }],
      [{ enumerable: true }],
    ])(
      "should set prop with the specified permissions",
      (propConfig: PropConfig) => {
        const defineSpy = jest
          .spyOn(Object, "defineProperty")
          .mockImplementationOnce(() => {});

        const someValue = faker.random.word();

        setPropValue(someObject, FIELD, someValue, propConfig);

        expect(defineSpy).toHaveBeenCalledWith(someObject, FIELD, {
          value: someValue,
          ...propConfig,
        });
      }
    );
  });

  describe("set prop setter", () => {
    it("should set the given setter and make it configurable", () => {
      const defineSpy = jest
        .spyOn(Object, "defineProperty")
        .mockImplementationOnce(() => {});

      setPropSetter(someObject, FIELD, (_value: any) => {});

      expect(defineSpy).toHaveBeenCalledWith(someObject, FIELD, {
        set: expect.any(Function),
        configurable: true,
      });
    });
  });

  describe("push into prop", () => {
    it("should push value into the prop", () => {
      const givenObj = {
        arr: [],
      };

      const pushedValue = faker.random.word();

      pushIntoProp(givenObj, "arr", [pushedValue]);

      expect(givenObj.arr).toContain(pushedValue);
    });

    it("should throw error when property does not exists", () => {
      const givenObj: Record<string, any> = {};

      const pushedValue = faker.random.word();
      let exception: any;

      try {
        pushIntoProp(givenObj, "arr", [pushedValue]);
      } catch (error) {
        exception = error ?? "some-error";
      }

      expect(exception).toEqual(
        new Error(
          `Cannot push values into prop because property arr is not an array`
        )
      );
    });

    it("should throw error when property is not an array", () => {
      const givenObj: Record<string, any> = {
        arr: faker.datatype.number(),
      };

      const pushedValue = faker.random.word();
      let exception: any;

      try {
        pushIntoProp(givenObj, "arr", [pushedValue]);
      } catch (error) {
        exception = error ?? "some-error";
      }

      expect(exception).toEqual(
        new Error(
          `Cannot push values into prop because property arr is not an array`
        )
      );
    });
  });
});
