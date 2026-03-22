import connectDB from "./db/db.js"
import app from "./app.js"
import { devLog } from "./utils/logger.js"

const port = process.env.PORT || 8001

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection", err)
    process.exit(1)
})
  
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception", err)
    process.exit(1)
})

connectDB()
.then(() => {
    app.listen(port, () => {
        devLog(`⚙️ Server running at http://localhost:${port}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed !!!", error)
    process.exit(1)
})