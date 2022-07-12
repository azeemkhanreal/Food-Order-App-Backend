import {Request,Response} from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utils';

export const createVendor = async (req: Request, res: Response) => {
    const {name,address,email,phone,ownerName,pincode,password,foodType} = <CreateVendorInput> req.body;
    const existingVendor = await Vendor.findOne({email});
    if(existingVendor){
        res.json({message:"A vendor is exist with this email id"})
    }
    // generate a salt
    const salt = await GenerateSalt()
        // encrypt password
    const userPassword = await GeneratePassword(password,salt);
    const createVendor = await Vendor.create({
    name,
    address,
    pincode,
    foodType,
    email,
    password:userPassword,
    salt,
    ownerName,
    phone,
    rating:0,
    serviceAvailable:false,
    coverImage:[],
    foods:[]
   })
   return res.status(201).json(createVendor);
}

export const getVendors = async (req:Request,res:Response)=>{
    const vendors = await Vendor.find({},{password:0,salt:0,__v:0});
    if(vendors===null){
        return res.status(404).json({message:"No vendors found"});
    }
    return res.status(200).json(vendors);
};

export const getVendorsById = async (req:Request,res:Response)=>{
    const {id} = req.params;
    const vendor = await Vendor.findById(id,{password:0,salt:0,__v:0});
    if(vendor===null){
        return res.status(404).json({message:"No vendor found"});
    }
    return res.status(200).json(vendor);
};

