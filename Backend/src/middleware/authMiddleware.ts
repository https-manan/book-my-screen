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
            // was status 300 — that's an HTTP redirection code, not an auth
            // failure code. 401 Unauthorized is correct here.
            return res.status(401).json({
                msg: "Unauthorized ascess"
            })
        }
        let decodeToken: MyJwtPayload;
        try {
            // jwt.verify() THROWS on an expired/invalid token (TokenExpiredError /
            // JsonWebTokenError) — it doesn't return null/false. The old code
            // relied on `if (!decodeToken)` after this call, which was dead code:
            // any bad token skipped straight past it into the outer catch below,
            // which returns 500. Since api.js's reauth logic only triggers a
            // refresh on a 401, expired access tokens were never actually
            // reaching the refresh flow — they just surfaced as a generic error.
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