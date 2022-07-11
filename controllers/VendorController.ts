import {Request,Response} from "express";
import { VendorLoginInput } from "../dto";
import { Vendor } from "../models";
import { ValidatePassword } from "../utils";

export const VendorLogin = async (req:Request,res:Response)=>{
    const {email,password} = <VendorLoginInput>req.body;
    const existingVendor = await Vendor.findOne({email});
     if(existingVendor!==null){
        //giving access and validation
        const validation = await ValidatePassword(password,existingVendor.password,existingVendor.salt);
        if(validation){
            return res.status(200).json(existingVendor);
        }
        else{
            return res.status(401).json({message:"Invalid password"});
        }
     }
     return res.status(404).json({message:"Login credential not valid"});
}