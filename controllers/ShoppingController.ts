import express,{ Request,Response,NextFunction } from "express";
import { Vendor } from "../models";
import { FoodDoc } from "../models/Food";

export const getFoodAvailability = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode,serviceAvailable:true})
    .sort({rating:1})
    .populate("foods")
    if(result.length>0){
       return res.status(200).json(result);
    }
    return res.status(404).json({message:"No food available in this pincode"});
}

export const getTopRestaurants = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode,serviceAvailable:true})
    .sort({rating:1})
    .limit(10)
    if(result.length>0){
       return res.status(200).json(result);
    }
    return res.status(404).json({message:"No Restaurant available in this pincode"});
}

export const getFoodsIn30Min = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode,serviceAvailable:true})
    .populate("foods");
    if(result.length>0){
        let foodResult:any = [];
        result.map(vendor=>{
            const foods = vendor.foods as [FoodDoc];
            foodResult.push(...foods.filter(food=>food.readyTime<=30));
        })
       return res.status(200).json(foodResult);
    }
    return res.status(404).json({message:"No Restaurant available in this pincode"});
}

export const searchFoods = async(req:Request,res:Response,next:NextFunction)=>{
    const pincode = req.params.pincode;
    const result = await Vendor.find({pincode:pincode,serviceAvailable:true})
    .populate("foods");

    if(result.length>0){
        let foodResult:any = [];
        result.map(item=> foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }

    return res.status(404).json({message:"No food available in this pincode"});
}

export const restaurantById = async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    const result = await Vendor.findById(id).populate("foods");
    if(result){
       return res.status(200).json(result);
    } 
    return res.status(404).json({message:"No data found"});
}