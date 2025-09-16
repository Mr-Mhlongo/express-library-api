import express from "express"
import * as bookModel from "../models/book"
import * as authorModel from "../models/author"
import { validateBook } from "../middleware/validate"
import { AppError } from "../middleware/errorHandler"

export const booksRouter = express.Router()

// Create
booksRouter.post("/", validateBook, (req, res, next) => {
  try {
    const { title, authorId, year } = req.body

    const author = authorModel.authors.find(a => a.id === authorId)
    if (!author) throw new AppError("Invalid authorId: author not found", 400)

    // Prevent duplicate title by same author
    const duplicate = bookModel.books.find(
      b => b.title === title && b.authorId === authorId
    )
    if (duplicate) throw new AppError("Book already exists for this author", 409)

    const book = bookModel.createBook({ title, authorId, year })
    res.status(201).json(book)
  } catch (err) {
    next(err)
  }
})

// List all 
booksRouter.get("/", (req, res, next) => {
  try {
    let results = [...bookModel.books]

    const { authorId, year, search, sort, page = "1", limit = "10" } = req.query

    // Filter by authorId
    if (authorId) {
      results = results.filter(b => b.authorId === Number(authorId))
    }

    // Filter by year
    if (year) {
      results = results.filter(b => b.year === Number(year))
    }

    // Search in title
    if (search && typeof search === "string") {
      results = results.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sorting
    if (sort && typeof sort === "string") {
      const field = sort.startsWith("-") ? sort.substring(1) : sort
      const direction = sort.startsWith("-") ? -1 : 1
      results.sort((a: any, b: any) =>
        a[field] > b[field] ? direction : -direction
      )
    }

    // Pagination
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const start = (pageNum - 1) * limitNum
    const end = start + limitNum
    const paginated = results.slice(start, end)

    res.json({
      total: results.length,
      page: pageNum,
      limit: limitNum,
      data: paginated,
    })
  } catch (err) {
    next(err)
  }
})

// Get by ID
booksRouter.get("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const book = bookModel.findBookById(id)
    if (!book) throw new AppError("Book not found", 404)
    res.json(book)
  } catch (err) {
    next(err)
  }
})

// Update
booksRouter.put("/:id", validateBook, (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const patch = req.body

    if (patch.authorId) {
      const author = authorModel.authors.find(a => a.id === patch.authorId)
      if (!author) throw new AppError("Invalid authorId", 400)
    }

    const updated = bookModel.updateBook(id, patch)
    if (!updated) throw new AppError("Book not found", 404)

    res.json(updated)
  } catch (err) {
    next(err)
  }
})

// Delete
booksRouter.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const deleted = bookModel.deleteBook(id)
    if (!deleted) throw new AppError("Book not found", 404)

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
