import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in the environment variables");
}

const config = {
    mongoUrl: process.env.MONGO_URL
}

export default config; 
