import { validateInstance } from "class-handler"
import { Request, Response } from "express"
import { Book, books } from "./books"
import { errorHandler } from "./errorHandler"

export const findBooks = (_request: Request, response: Response) => {
  try {
    response.status(200).json(books)
  } catch (error) {
    console.log(`GET /books failed due to ${error}`)
    response.status(500).json()
  }
}

export const registerNewBook = (request: Request, response: Response) => {
  try {
    const book = new Book(request.body)
    validateInstance(book)
    books.push(book)
    response.status(201).json()
  } catch (error) {
    console.log(`POST /books failed due to ${JSON.stringify(error)}`)

    errorHandler(error, response)
  }
}
