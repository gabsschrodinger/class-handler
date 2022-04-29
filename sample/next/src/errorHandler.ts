import { Response } from "express"
import { BaseError, INTERNAL_SERVER_ERROR } from "./error"

export const errorHandler = (error: any, response: Response): void => {
  const exception = error instanceof BaseError ? error : INTERNAL_SERVER_ERROR

  response.status(exception.statusCode).json(exception)
}
