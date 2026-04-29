import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../user/userModel";
import { Refresh } from "./refreshModel";
import mongoose from "mongoose";
import { ITokenPayload } from "./authInterface";

export const generateToken = async (payload:ITokenPayload) => {
    try {
        const token = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"1h"});
        const refreshToken=jwt.sign(payload,process.env.REFRESH_SECRET as string,{expiresIn:"7d"});
        return {token,refreshToken};
    } catch (error) {
        console.log(error);
        throw new Error("Token generation failed");
    }
};

export const storeRefreshToken = async (refreshToken:string,userId:string) => {
    try {
        await Refresh.create({token:refreshToken,userId:userId as string });
    } catch (error) {
        console.log(error);
    }
};

export const verifyToken=async(req: Request, res: Response)=>{
    try {
        const token = req.body;
        if(!token){
            return res.status(401).json({
                msg:"No token found"
            })
        }
        const verify =jwt.verify(token,process.env.JWT_SECRET as string)
        if(!verify){
            return res.status(300).json({
                msg:"Unauthorized ascess"
            })
        }
        return res.status(201).json({
            msg:"verified"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in verify token endpoint."
        })
    }
}


export const findRefreshToken = async(req: Request, res: Response)=>{
    try {
        const{userId} =req.params;
        const tok = Refresh.findById(userId);
        if(!tok){
            return res.status(401).json({
                msg:"No token found"
            })
        }
        return res.status(201).json({
            tok,
            msg:"token found."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in finding token EP"
        });
    }
}

export const delToken =async(req: Request, res: Response)=>{
    try {
        const tok = req.body;
        if(!tok){
            return res.status(401).json({
                msg:"Provide token"
            })
        }
        const tokFound = Refresh.findOne({token:tok});
        if(!tokFound){
            return res.status(404).json({
                msg:"No token found"
            })
        }
        await Refresh.findOneAndDelete({token:tok});
        return res.status(201).json({
            msg:"token deleted successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in deleting token EP"
        });
    }
}

export const updateRefreshToken=async(req: Request, res: Response)=>{
    try {
        const{userId} =req.params;
        const newToken = req.body;
        if(!newToken){
            return res.status(401).json({
                msg:"Provide new token"
            })
        }
        await Refresh.findByIdAndUpdate({userId},{token:newToken},{new:true})
        return res.status(201).json({
            msg:"token updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in updating token EP"
        });
    }
}