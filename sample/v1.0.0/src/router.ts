import bodyParser from "body-parser"
import express from "express"
import { findBooks, registerNewBook } from "./book.controller"

const router = express.Router()
const jsonParser = bodyParser.json()

router.get("/books", findBooks)

router.post("/books", jsonParser, registerNewBook)

export default router
