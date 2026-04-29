import  jwt, { JwtPayload }  from 'jsonwebtoken';
import {NextFunction, Request,Response} from "express";
import { User } from '../modules/user/userModel';


declare global { //as express dosent have user type so this is to define user for :- req.user=user;(code at bottom)
  namespace Express {
    interface Request{
      user?: JwtPayload
    }
  }
}


interface MyJwtPayload extends JwtPayload{ //This is to tell that type of _id is string here const user = await User.findById(decodeToken._id);
  _id: string;
}



export const isVerifiedUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {accessToken} = req.cookies;
        if(!accessToken){
            return res.status(300).json({
                msg:"Unauthorized ascess"
            })
        }
        const decodeToken = jwt.verify(accessToken,process.env.JWT_SECRET as string) as MyJwtPayload
        if(!decodeToken){
            return res.status(404).json({
                msg:"Unauthorized ascess"
            })
        }
        const user = await User.findById(decodeToken._id);
        if(!user){
            return res.status(404).json({
                msg:"User not found"
            })
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in auth Middleware"
        })
    }
}