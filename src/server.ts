import express, { Express } from "express"
import bodyParser from "body-parser"
import { authorsRouter } from "./routes/authors"
import { booksRouter } from "./routes/books"
import { logger } from "./middleware/logger"
import { errorHandler } from "./middleware/errorHandler"

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(logger)

app.use("/authors", authorsRouter)
app.use("/books", booksRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
