import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URI } from "../config";

export default async ()=>{
    try {  
        await mongoose.connect(MONGO_URI!);
        console.log("Database connected");        
    } catch (error) {
        console.log(error)
    }
    mongoose.connection.on("disconnected", () => {
        console.log("DB is disconnected")
    })
    mongoose.connection.on("error", (err) => {
        console.log("DB connection error",err)
    })

}