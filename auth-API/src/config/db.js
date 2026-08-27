import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    if (!config.mongoUrl) {
        
        throw new Error("MongoDB connection string is not defined in the environment variables.");
    }
    await mongoose.connect(config.mongoUrl)
    console.log("Database connected successfully");
}
export default connectDB;