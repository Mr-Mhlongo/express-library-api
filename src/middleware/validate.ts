import { Request, Response, NextFunction } from "express"

export function validateAuthor(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid author payload: 'name' is required" })
  }
  next()
}