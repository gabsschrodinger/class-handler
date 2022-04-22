import { ArrayType, NumberType } from "class-handler"

export interface BaseErrorSchema {
  messages: Array<string>
  statusCode: number
}

export const BAD_REQUEST_ERROR: BaseErrorSchema = {
  messages: [],
  statusCode: 400,
}

export const INTERNAL_SERVER_ERROR: BaseErrorSchema = {
  messages: ["Internal error"],
  statusCode: 500,
}

export class BaseError {
  @ArrayType()
  messages: Array<string>

  @NumberType()
  statusCode: number

  constructor({ messages, statusCode }: BaseErrorSchema) {
    this.messages = messages
    this.statusCode = statusCode
  }
}
