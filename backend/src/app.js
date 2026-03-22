import express from "express"
import cors from "cors"
import { JSON_LIMIT } from "./constants.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: JSON_LIMIT }))
app.use(express.urlencoded({ extended: true, limit: JSON_LIMIT }))
app.set("trust proxy", true);

// routes import
import urlRouter from "./routes/url.routes.js"
import redirectRouter from "./routes/redirect.routes.js"

// routes declaration
app.use("/api/v1/links", urlRouter)
app.use("/", redirectRouter)


export default app