import express, {Request,Response,NextFunction} from "express";
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from "../controllers";
import { Authenticate } from "../middlewares";
const router = express.Router();

router.post("/login",VendorLogin)
router.get("/profile",Authenticate,GetVendorProfile)
router.patch("/profile",UpdateVendorProfile)
router.patch("/profile",UpdateVendorService)


router.use(Authenticate)

router.route("/profile")
.get(GetVendorProfile)
.patch(UpdateVendorProfile)

router.patch("/service",UpdateVendorService)

router.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.json({message:"Hello from Vendor"});
})

export {router as VendorRoute}