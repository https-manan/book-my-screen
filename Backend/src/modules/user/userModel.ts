import mongoose from "mongoose";
import { IUser } from "./userInterface";


const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
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
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

 
export const User = mongoose.model("User",userSchema);