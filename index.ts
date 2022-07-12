import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import { AdminRoute,VendorRoute } from "./routes";
import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URI } from "./config";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose.connection.on("disconnected", () => {
    console.log("DB is disconnected")
})
mongoose.connection.on("error", (err) => {
    console.log("DB connection error",err)
})

mongoose.connect(MONGO_URI!,()=>{
    console.log("db is connected")
  })

app.listen(PORT,()=>{
    console.clear();
    console.log(`Server is running on port ${PORT}`)
})