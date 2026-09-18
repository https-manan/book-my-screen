import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { User } from '../modules/user/userModel';
import { IUser } from '../modules/user/userInterface';


declare global { //as express dosent have user type so this is to define user for :- req.user=user;(code at bottom)
  namespace Express {
    interface Request {
      // was typed as JwtPayload — but req.user is set to the full Mongoose
      // User document below (`req.user = user`), not the decoded JWT payload.
      // The type didn't match what's actually stored.
      user?: IUser & { _id: string }
    }
  }
}


interface MyJwtPayload extends JwtPayload { //This is to tell that type of _id is string here const user = await User.findById(decodeToken._id);
  _id: string;
}



export const isVerifiedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return res.status(401).json({
                msg: "Unauthorized ascess"
            })
        }
        let decodeToken: MyJwtPayload;
        try {
            decodeToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as MyJwtPayload;
        } catch (err) {
            return res.status(401).json({
                msg: "Unauthorized ascess"
            })
        }
        const user = await User.findById(decodeToken._id);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }
        req.user = user as unknown as IUser & { _id: string };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in auth Middleware"
        })
    }
}