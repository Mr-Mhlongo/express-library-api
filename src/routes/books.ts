import express from "express"
import * as bookModel from "../models/book"
import * as authorModel from "../models/author"
import { validateBook } from "../middleware/validate"

export const booksRouter = express.Router()

// Create
booksRouter.post("/", validateBook, (req, res) => {
  const { title, authorId, year } = req.body

  // enforce author exists
  const author = authorModel.authors.find(a => a.id === authorId)
  if (!author) {
    return res.status(400).json({ error: "Invalid authorId: author not found" })
  }

  const book = bookModel.createBook({ title, authorId, year })
  res.status(201).json(book)
})

// List all
booksRouter.get("/", (_req, res) => {
  res.json(bookModel.books)
})

// Get by ID
booksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const book = bookModel.findBookById(id)
  if (!book) return res.status(404).json({ error: "Book not found" })
  res.json(book)
})

// Update
booksRouter.put("/:id", validateBook, (req, res) => {
  const id = Number(req.params.id)
  const patch = req.body

  if (patch.authorId) {
    const author = authorModel.authors.find(a => a.id === patch.authorId)
    if (!author) return res.status(400).json({ error: "Invalid authorId" })
  }

  const updated = bookModel.updateBook(id, patch)
  if (!updated) return res.status(404).json({ error: "Book not found" })
  res.json(updated)
})

// Delete
booksRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const deleted = bookModel.deleteBook(id)
  if (!deleted) return res.status(404).json({ error: "Book not found" })
  res.status(204).send()
})
