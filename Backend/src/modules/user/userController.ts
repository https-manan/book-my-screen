import { Request, Response } from "express";
import { User } from "./userModel";

export const createUser = async(req:Request,res:Response)=>{
    try {
        const {name,email,phone}=req.body;
        if(!name||!email||!phone){
            return res.status(400).json({
                msg:"All fields are required"
            })
        }
        const isExists = await User.findOne({email});
        if(isExists){
            return res.status(400).json({
                msg:"User with this email already exists"
            })
        }
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
            msg:"User created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in createUser endpoint"
        })
    }
}

export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                msg:"No user found"
            })
        }
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getAllUsers endpoint"
        })
    }
}

export const getUserById=async(req:Request,res:Response)=>{
    try {
        const {id} = req.user?._id;
        const user =await User.findById(id);
        if(!user)return res.status(404).json({
            msg:"User not found"
        })
        return res.status(200).json({
            user
        })
    } catch (error) {
       console.log(error);
        return res.status(500).json({
            msg:"Error in getUserById endpoint"
        }) 
    }
}

export const activateUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.user?._id;
        const userStatus = req.body;
        const user=await User.findById(id);
        if(!user)return res.status(400).json({msg:"User not found"});
        await User.findByIdAndUpdate(id,{activateUser:userStatus},{new:true})
        return res.status(201).json({
            msg:"User updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in activateUser endpoint"
        })
    }
}
