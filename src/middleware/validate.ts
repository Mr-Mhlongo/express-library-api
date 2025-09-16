import { Request, Response, NextFunction } from "express"

export function validateAuthor(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid author payload: 'name' is required" })
  }
  next()
}

export function validateBook(req: Request, res: Response, next: NextFunction) {
  const { title, authorId, year } = req.body

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Invalid book payload: 'title' is required" })
  }
  if (typeof authorId !== "number") {
    return res.status(400).json({ error: "Invalid book payload: 'authorId' must be a number" })
  }
  if (year && typeof year !== "number") {
    return res.status(400).json({ error: "Invalid book payload: 'year' must be a number" })
  }

  next()
}