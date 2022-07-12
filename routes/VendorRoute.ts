import express, {Request,Response,NextFunction} from "express";
import { AddFood, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";
const router = express.Router();

router.post("/login",VendorLogin)

router.use(Authenticate)

router.route("/profile")
.get(GetVendorProfile)
.patch(UpdateVendorProfile)

router.post("/food",AddFood);
router.get("/foods");
 
router.patch("/service",UpdateVendorService)

router.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:"Hello from Vendor"});
})

export {router as VendorRoute}