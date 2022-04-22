import { ArrayOf, CatchMany, isString, StringType } from "class-handler"
import { BAD_REQUEST_ERROR } from "./error"

interface BookSchema {
  title: string
  author: string
  description: string
  genres: Array<string>
}

@CatchMany(BAD_REQUEST_ERROR, "messages")
export class Book {
  @StringType()
  title: string

  @StringType()
  author: string

  @StringType()
  description: string

  @ArrayOf(isString)
  genres: Array<string>

  constructor({ title, author, description, genres }: BookSchema) {
    this.title = title
    this.author = author
    this.description = description
    this.genres = genres
  }
}

export const books: Array<Book> = []
