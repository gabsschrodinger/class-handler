import { validateInstance } from "class-handler"
import { Response } from "express"
import { BaseError, INTERNAL_SERVER_ERROR } from "./error"

export const errorHandler = (error: any, response: Response): void => {
  let exception: BaseError
  try {
    const baseError = new BaseError(error)
    validateInstance(baseError)

    exception = baseError
  } catch (_exception) {
    exception = INTERNAL_SERVER_ERROR
  }

  response.status(exception.statusCode).json(exception)
}
