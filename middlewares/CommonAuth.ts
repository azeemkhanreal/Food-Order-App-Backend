import {Request,Response,NextFunction} from "express";
import { AuthPayload } from "../dto/auth.dto";
import { ValidateSignature } from "../utils";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
} 

export const Authenticate = async(req:Request,res:Response,next:NextFunction)=>{
    const validate = await ValidateSignature(req);
    if(validate){
        next();
    }
    else{
        return res.status(401).json({message:"User not authorized"});
    }
}