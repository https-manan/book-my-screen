import mongoose from "mongoose";
import { IUser } from "./userInterface";
import { boolean } from "zod";


const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        rqeuired:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    activateUser:{
        type:boolean,
        default:false
    }
},{timestamps:true}) 

 
export const User = mongoose.model("User",userSchema);