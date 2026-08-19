// import mongoose from "mongoose";
// import { IRefreshTokenPayload } from "./authInterface";

// const refreshSchema = new mongoose.Schema<IRefreshTokenPayload>({
//     token:{
//         type:String,
//         required:true
//     },
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },
//     createdAt:{
//         type:Date
//     }
// },{timestamps:true})

// export const Refresh = mongoose.model<IRefreshTokenPayload>("Refresh",refreshSchema)