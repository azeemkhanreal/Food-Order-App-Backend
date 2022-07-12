import bcrypt from "bcrypt";
import { Request } from "express";
import { VendorPayload } from "../dto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { AuthPayload } from "../dto/auth.dto";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
  return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payload: VendorPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d"
  });
}

export const ValidateSignature = async(req:Request)=>{
  const signature = req.get("Authorization");
  if(signature){
    try{
      const payload = await jwt.verify(signature.split(" ")[1],JWT_SECRET) as AuthPayload;
      req.user = payload;
      return true;
    }
    catch(err){
      return false;
    }
  } 
  return false;
}