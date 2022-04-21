import { ValidationError } from "../../src/types"
import * as utils from "../../src/property/utils"

interface TestConditions {
  errorScenario1: any
  errorScenario2: any
  errorScenario3: any
  successScenario1: any
}

export const validateDecorator = (
  TestedDecorator: (error?: ValidationError) => PropertyDecorator,
  defaultErrorMessage: (className: string, field: string) => string,
  {
    errorScenario1,
    errorScenario2,
    errorScenario3,
    successScenario1,
  }: TestConditions
) => {
  it("should throw specified error object when it receives an object", () => {
    let exception: any
    const errorObj = { error: "some error" }
    const decoratorSpy = jest.spyOn(utils, "validationDecorator")

    class SomeClass {
      @TestedDecorator(errorObj)
      someField: any

      constructor(someField?: any) {
        this.someField = someField
      }
    }

    try {
      new SomeClass(errorScenario1)
    } catch (error) {
      exception = error
    }

    expect(exception).toEqual(errorObj)

    expect(decoratorSpy).toHaveBeenCalledWith(expect.any(Function), errorObj)
  })

  it("should throw new error with given message when it receives a string", () => {
    let exception: any
    const errorMessage = "some message"
    const decoratorSpy = jest.spyOn(utils, "validationDecorator")

    class SomeClass {
      @TestedDecorator(errorMessage)
      someField: any

      constructor(someField?: any) {
        this.someField = someField
      }
    }

    try {
      new SomeClass(errorScenario2)
    } catch (error) {
      exception = error
    }

    expect(exception).toEqual(new Error(errorMessage))
    expect(decoratorSpy).toHaveBeenCalledWith(
      expect.any(Function),
      errorMessage
    )
  })

  it("should throw default error when error is empty", () => {
    let exception: any
    const errorMessage = defaultErrorMessage("SomeClass", "someField")
    const decoratorSpy = jest.spyOn(utils, "validationDecorator")

    class SomeClass {
      @TestedDecorator()
      someField: any

      constructor(someField?: any) {
        this.someField = someField
      }
    }

    try {
      new SomeClass(errorScenario3)
    } catch (error) {
      exception = error
    }

    expect(exception).toEqual(new Error(errorMessage))
    expect(decoratorSpy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function)
    )
  })

  it("should not throw error when field is filled with a valid input", () => {
    let exception: any

    class SomeClass {
      @TestedDecorator()
      someField: any

      constructor(someField?: any) {
        this.someField = someField
      }
    }

    try {
      new SomeClass(successScenario1)
    } catch (error) {
      exception = error
    }

    expect(exception).toBeUndefined()
  })
}
