import express, {Request,Response,NextFunction} from "express";
import { createVendor,getVendors,getVendorsById } from "../controllers";
const router = express.Router();
 
router.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:"Hello from Admin"});
})

router.get("/vendors",getVendors)
router.get("/vendors/:id",getVendorsById)
router.post("/vendor",createVendor)

export {router as AdminRoute}