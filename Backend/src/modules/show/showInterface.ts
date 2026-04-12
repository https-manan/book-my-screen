import { Types } from "mongoose";

export interface IShow{
    _id?:string,
    movie:Types.ObjectId,
    theater:Types.ObjectId,
    location:string,
    format:"2D"|"3D"|"IMAX"|"PVR PXL";
    audioType?:string;
    startTime:Date,
    date:Date, 
    seatLayout:{
        row:string,
        type: "NORMAL" | "EXCLUSIVE" | "PREMIUM";
        price:number
        seats:{  
            number:number,
            status:"AVAILABLE"|"BOOKED"|"BLOCKED";
        }[],
    }[]
    createdAt?:Date;
    updatedAt?:Date
}