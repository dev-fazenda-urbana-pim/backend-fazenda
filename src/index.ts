import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import "express-async-errors";

import { errorHandler } from "./middlewares/errors";
import { router } from "./routes";

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
