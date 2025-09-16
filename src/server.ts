import express , {Express} from "express";
import bodyParser from "body-parser"
import { authorsRouter } from "./routes/authors"
import { logger } from "./middleware/logger"

const app: Express =express()
const PORT = process.env.PORT ||3000

app.use(bodyParser.json())
app.use(logger)

app.use("/authors", authorsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}) 