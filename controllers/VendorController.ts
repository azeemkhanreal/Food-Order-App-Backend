import {Request,Response} from "express";
import { VendorLoginInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSignature, ValidatePassword } from "../utils";

export const VendorLogin = async (req:Request,res:Response)=>{
    const {email,password} = <VendorLoginInput>req.body;
    const existingVendor = await Vendor.findOne({email});
     if(existingVendor!==null){
        //giving access and validation
        const validation = await ValidatePassword(password,existingVendor.password,existingVendor.salt);
        if(validation){
            const signature = GenerateSignature({
                _id:existingVendor._id,
                email:existingVendor.email,
                name:existingVendor.name,
                foodType:existingVendor.foodType
            })
            return res.status(200).json(signature);
        }
        else{
            return res.status(401).json({message:"Invalid password"});
        }
     }
     return res.status(404).json({message:"Login credential not valid"});
}

export const GetVendorProfile = async(req:Request,res:Response)=>{
    const user = req.user;
    if(user){
        const vendor = await Vendor.findById(user._id);
        if(vendor){
            return res.status(200).json(vendor);
        }
        return res.status(404).json({message:"Vendor Information not found"});
    }
}
export const UpdateVendorProfile = async(req:Request,res:Response)=>{}
export const UpdateVendorService = async(req:Request,res:Response)=>{}