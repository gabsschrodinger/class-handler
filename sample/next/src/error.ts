export interface BaseErrorSchema {
  messages: Array<string>
  statusCode: number
}

export class BaseError {
  messages: Array<string>
  statusCode: number

  constructor({ messages, statusCode }: BaseErrorSchema) {
    this.messages = messages
    this.statusCode = statusCode
  }
}

export const BAD_REQUEST_ERROR = new BaseError({
  messages: [],
  statusCode: 400,
})

export const INTERNAL_SERVER_ERROR = new BaseError({
  messages: ["Internal error"],
  statusCode: 500,
})
