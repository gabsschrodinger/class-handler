import request from "supertest"
import express from "express"
import router from "../src/router"
import faker from "@faker-js/faker"
import { Genre } from "../src/book.entity"

const app = express()
app.use(router)

const title = faker.random.words(3)
const author = faker.name.firstName()
const description = faker.random.words(5)
const genres = [faker.random.objectElement(Genre)]

describe("App", () => {
  it("should return empty array when first calling GET /books", async () => {
    await request(app)
      .get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([])
      })
  })

  it("should create book when calling POST /books with valid request body", async () => {
    await request(app)
      .post("/books")
      .send({ title, author, description, genres })
      .expect(201)
  })

  it("should return BAD REQUEST when calling POST /books with invalid request body", async () => {
    await request(app)
      .post("/books")
      .send({ title, author, description })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          messages: ["Field genres of Book is not a valid array"],
          statusCode: 400,
        })
      })
  })

  it("should not accumulate error messages", async () => {
    await request(app)
      .post("/books")
      .send({ title, author, description })
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          messages: ["Field genres of Book is not a valid array"],
          statusCode: 400,
        })
      })
  })

  it("should return the existing book when calling GET /books", async () => {
    await request(app)
      .get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([
          {
            title,
            author,
            description,
            genres,
          },
        ])
      })
  })
})
