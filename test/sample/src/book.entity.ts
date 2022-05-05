import { ArrayOf, CatchMany, isEnum, StringType } from "./../../../src"
import { BAD_REQUEST_ERROR } from "./error"

export enum Genre {
  HORROR = "Horror",
  COMEDY = "Comedy",
}

interface BookSchema {
  title: string
  author: string
  description: string
  genres: Array<Genre>
}

@CatchMany(BAD_REQUEST_ERROR, "messages")
class Book {
  @StringType()
  title: string

  @StringType()
  author: string

  @StringType()
  description: string

  @ArrayOf(isEnum(Genre))
  genres: Array<Genre>

  constructor({ title, author, description, genres }: BookSchema) {
    this.title = title
    this.author = author
    this.description = description
    this.genres = genres
  }
}

const books: Array<Book> = []

export { Book, books }
