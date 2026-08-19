// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../user/userModel";
// import { Refresh } from "./refreshModel";
// import mongoose from "mongoose";
// import { ITokenPayload } from "./authInterface";

// export const generateToken = async (payload:ITokenPayload) => { //Is payload mai id,email and phone jayga
//     try {
//         const token = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"1h"});
//         const refreshToken=jwt.sign(payload,process.env.REFRESH_SECRET as string,{expiresIn:"7d"});
//         return {token,refreshToken};
//     } catch (error) {
//         console.log(error);
//         throw new Error("Token generation failed");
//     }
// };

// export const storeRefreshToken = async (refreshToken:string,userId:string) => {
//     try {
//         await Refresh.create({token:refreshToken,userId:userId as string });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const verifyAscessToken=async(token:string)=>{
//     try {
//         const verify =jwt.verify(token,process.env.JWT_SECRET as string)
//         if(!verify){
//             throw new Error("Ascess token in Invalid");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const verifyRefreshToken=async(token:string)=>{
//     try {
//         const verifyedToken =jwt.verify(token,process.env.REFRESH_SECRET as string)
//         if(!verifyedToken){
//             throw new Error("Ascess token in Invalid");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const findRefreshToken = async(userId:string,token:string)=>{
//     try {
//         const refreshToken= await Refresh.findOne({userId, token});
//         if(!refreshToken){
//             throw new Error("Refresh token not found");
//         }
//         return refreshToken

//     } catch (error) {
//         console.log(error);
//         throw error; 
//     }
// }

// export const delToken =async(req: Request, res: Response)=>{
//     try {
//         const tok = req.body;
//         if(!tok){
//             return res.status(401).json({
//                 msg:"Provide token"
//             })
//         }
//         const tokFound = Refresh.findOne({token:tok});
//         if(!tokFound){
//             return res.status(404).json({
//                 msg:"No token found"
//             })
//         }
//         await Refresh.findOneAndDelete({token:tok});
//         return res.status(201).json({
//             msg:"token deleted successfully."
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg: "Error in deleting token EP"
//         });
//     }
// }

// export const updateRefreshToken=async(userId:string,newToken:string)=>{
//     try {
//         await Refresh.findByIdAndUpdate({userId},{token:newToken},{new:true});
//     } catch (error) {
//         console.log(error);
//         new Error;
//     }
// }

