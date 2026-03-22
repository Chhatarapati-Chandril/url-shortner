import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { devLog } from "../utils/logger.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        devLog(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection Failed: ", error)
        process.exit(1)
    }
}


export default connectDB