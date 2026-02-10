import { Request, Response, NextFunction } from "express"

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(`[ERROR] ${req.method} ${req.url}`, err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  res.status(500).json({ error: "Internal Server Error" })
}
