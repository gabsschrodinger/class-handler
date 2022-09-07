import { faker } from "@faker-js/faker"
import { ValidationError } from "../../src/types"
import * as utils from "../../src/property/utils"

interface TestScenarios {
  errorScenario1: any
  errorScenario2: any
  errorScenario3: any
  errorScenario4: any
  successScenario1: any
}

export const validateDecorator = (
  TestedDecorator: (error?: ValidationError) => PropertyDecorator,
  defaultErrorMessage: (className: string, field: string) => string,
  {
    errorScenario1,
    errorScenario2,
    errorScenario3,
    errorScenario4,
    successScenario1,
  }: TestScenarios
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

  it("should throw given error instance when it receives one", () => {
    let exception: any

    class CustomError extends Error {
      isCustom: boolean

      constructor(message: string) {
        super(message)
        this.isCustom = true
      }
    }
    const errorInstance = new CustomError(faker.random.word())
    const decoratorSpy = jest.spyOn(utils, "validationDecorator")

    class SomeClass {
      @TestedDecorator(errorInstance)
      someField: any

      constructor(someField?: any) {
        this.someField = someField
      }
    }

    try {
      new SomeClass(errorScenario4)
    } catch (error) {
      exception = error
    }

    expect(exception).toEqual(errorInstance)
    expect(exception instanceof CustomError).toBeTruthy()
    expect(decoratorSpy).toHaveBeenCalledWith(
      expect.any(Function),
      errorInstance
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

    let someInstance: SomeClass

    try {
      someInstance = new SomeClass(successScenario1)
    } catch (error) {
      exception = error ?? "some-error"
    }

    expect(exception).toBeUndefined()
    expect(someInstance).toEqual({ someField: successScenario1 })
  })
}
