import express from "express"
import { authors, createAuthor } from "../models/author"
import { books } from "../models/book"
import { AppError } from "../middleware/errorHandler"

export const authorsRouter = express.Router()

authorsRouter.post("/", (req, res) => {
  const { name, bio } = req.body
  if (!name) return res.status(400).json({ error: "Name is required" })
  const author = createAuthor(name, bio)
  res.status(201).json(author)
})

authorsRouter.get("/", (_req, res) => {
  res.json(authors)
})

authorsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const author = authors.find(a => a.id === id)
  if (!author) return res.status(404).json({ error: "Author not found" })
  res.json(author)
})

authorsRouter.get("/:id/books", (req, res) => {
  const id = Number(req.params.id)
  const author = authors.find(a => a.id === id)
  if (!author) return res.status(404).json({ error: "Author not found" })

  const authorBooks = books.filter(b => b.authorId === id)
  res.json({ author, books: authorBooks })
})

authorsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id)
  const author = authors.find(a => a.id === id)
  if (!author) return res.status(404).json({ error: "Author not found" })
  author.name = req.body.name ?? author.name
  author.bio = req.body.bio ?? author.bio
  res.json(author)
})

authorsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const index = authors.findIndex(a => a.id === id)
  if (index === -1) return res.status(404).json({ error: "Author not found" })
  authors.splice(index, 1)
  res.status(204).send()
})
