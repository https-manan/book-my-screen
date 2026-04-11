import mongoose from "mongoose";
import { config } from "./config";

const connectDb=async()=>{
    try {
        await mongoose.connect(config.databaseUrl as string);
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;