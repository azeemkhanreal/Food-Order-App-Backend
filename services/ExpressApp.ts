import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors"
import { AdminRoute,VendorRoute,ShoppingRoute } from "../routes";
import path from "path";

export default async (app:Application)=>{
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use("/images",express.static(path.join(__dirname,"images")));
    
    app.use("/admin", AdminRoute);
    app.use("/vendor", VendorRoute);
    app.use("/shopping",ShoppingRoute);
    return app;
}
