import {Request,Response} from "express";
import { VendorEditInput, VendorLoginInput } from "../dto";
import { CreateFoodInputs } from "../dto/food.dto";
import { Vendor } from "../models";
import { GenerateSignature, ValidatePassword } from "../utils";
import {Food} from "../models/Food";

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

export const UpdateVendorProfile = async(req:Request,res:Response)=>{
    const {foodType,name,phone,address} =<VendorEditInput> req.body;
    if(!foodType || !name || !phone || !address){
        return res.status(401).json({message:"Please fill required fields - foodType,name,phone,address"});
    }
    const user = req.user;
    if(user){
        const existingVendor = await Vendor.findById(user._id);
        if(existingVendor!==null){
            existingVendor.name = name;
            existingVendor.foodType = foodType;
            existingVendor.phone = phone;
            existingVendor.address = address;

            const saveVendor = await existingVendor.save();
            return res.status(201).json(saveVendor);
        }
        return res.status(200).json(existingVendor);
    }
    return res.status(404).json({message:"Vendor Information not found"});

}

export const UpdateVendorService = async(req:Request,res:Response)=>{
    const user = req.user;
    if(user){
        const existingVendor = await Vendor.findById(user._id);
        if(existingVendor!==null){
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const saveVendor = await existingVendor.save();
            return res.status(201).json(saveVendor);
        }
    }
}

export const AddFood = async (req:Request,res:Response)=>{
    const user = req.user;
    if(user){
        const {name,description,category,foodType,readyTime,price} =<CreateFoodInputs> req.body;
        const vendor = await Vendor.findById(user._id);
        if(vendor!==null){

            const files = req.files as [Express.Multer.File];
            const images = files.map((file:Express.Multer.File)=>file.filename)

            const createFood = await Food.create({ 
                vendorId: vendor._id,
                name,
                description,
                category,
                images,
                foodType,
                readyTime,
                price,
                rating:0
            });
            vendor.foods.push(createFood);
            const result = await vendor.save();
            return res.status(201).json(result);
        }
        return res.status(401).json({message:"Something went wrong with add food"})
     }}

export const GetFoods = async (req:Request,res:Response)=>{
    const user = req.user;
    if(user){
        const foods = await Food.find({vendorId:user._id});
        if(foods){
            return res.status(200).json(foods);
        }
        return res.status(404).json({message:"Foods not found"});
    }
    return res.status(401).json({message:"Food information not found"})
}