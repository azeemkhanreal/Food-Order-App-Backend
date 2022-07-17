import express,{ Request,Response,NextFunction } from "express";
import { Vendor } from "../models";

export const getFoodAvailability = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode,serviceAvailable:true})
    .populate("foods")
    if(result.length>0){
       return res.status(200).json(result);
    }
    return res.status(404).json({message:"No food available in this pincode"});
}

export const getTopRestaurants = async(req:Request,res:Response,next:NextFunction)=>{}
export const getFoodsIn30Min = async(req:Request,res:Response,next:NextFunction)=>{}
export const searchFoods = async(req:Request,res:Response,next:NextFunction)=>{}
export const restaurantById = async(req:Request,res:Response,next:NextFunction)=>{}