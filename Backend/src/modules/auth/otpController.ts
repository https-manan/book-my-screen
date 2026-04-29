import { Request, Response } from "express";
import otpGenerator from "otp-generator"
import crypto from 'crypto'
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { User } from "../user/userModel";
import { generateToken, storeRefreshToken } from "./tokenController";
import { Refresh } from "./refreshModel";




//Nodemailer
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_ID,
        pass:process.env.EMAIL_PASS
    }
})

const generateOtp = async()=>{
    try {
        const otp = otpGenerator.generate(6,{digits:true,lowerCaseAlphabets: false,upperCaseAlphabets: false,specialChars: false});
        return otp;
    }catch (error){
        console.log(error);
    }
}


const generateOTPHash = (data: string) => {
    return crypto
      .createHmac('sha256', process.env.HASH_SECRET as string)
      .update(data)
      .digest('hex');
}

const verify=(hashedOTP:string,data:string)=>{
    const newHashed = generateOTPHash(data);
    return newHashed===hashedOTP
}

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Book my screen",
    link: "https://yourapp.com",
  },
});

const sendOTPByMail = async (email:string,otp:string) => {
  try {
    const emailContent = {
      body: {
        name: email,
        intro: "Your OTP for verification",
        action: {
          instructions:"Use the OTP below to verify your account:",
          button: {
            color: "#22BC66",
            text: otp.toString(),
            link: "#",
          },
        },
        outro: "This OTP is valid for a 5 min time.",
      },
    };
    const html = mailGenerator.generate(emailContent);
    await transport.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Your OTP Code",
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async(email:string)=>{
    const regix =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regix.test(email);
}


//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

//The main controller starts from here 

export const sendOTP=async(req:Request,res:Response)=>{
    try {
        const {email} = req.body;
        const tl =60*5*1000; //5min
        const expires = Date.now()+tl;
        if(!(await verifyEmail(email))){
            return res.status(401).json({
                msg:"Enter a valid email"
            })
        }
        const otp=await generateOtp();
        const data = `${email}.${otp}.${expires}`
        const hashedotp = generateOTPHash(data);
        try {
            await sendOTPByMail(email,otp!);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            msg:"Error in sendOTP endpoint"
        })
        }
        return res.status(200).json({
            hash:`${hashedotp}.${expires}`,
            email,
            msg:"OTP sent successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in sendOTP endpoint"
        })
    }
}

export const verifyOtp=async(req:Request,res:Response)=>{
    try {
        const {hash,otp,email}=req.body;
        if(!hash||!otp||!email){
            return res.status(401).json({
                msg:"Please provide all credentials"
            })
        }
        const [hashedOTP,expires]= hash.split(".");
        if(Date.now()>+expires){
            return res.status(410).json({
                msg:"OTP has been expired"
            })
        }
        const data =`${email}.${otp}.${expires}`;
        const isValid= verify(hashedOTP,data);
        if(!isValid){
            return res.status(404).json({
                msg:"Invalid otp"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                msg:"No user found pls signUp"
            })
        }
        //Generate token 
        const {token,refreshToken }=await generateToken({_id:user._id,email:user.email,phone:user.phone});
        await storeRefreshToken(refreshToken,user._id);
        res.cookie("accessToken",token,{
            maxAge:1000*60*60,
            httpOnly:true,
            sameSite:"none"
        })
        res.cookie("refreshToken",refreshToken,{
            maxAge:1000*60*60,
            httpOnly:true,
            sameSite:"none"
        })
        res.json({auth:true,user});
    }catch (error){
        console.log(error);
        return res.status(500).json({
            msg:"Error in verifying OTP"
        })
    }
}


export const logout = async(req:Request,res:Response)=>{
    try {
        res.clearCookie('accessToken');
        res.clearCookie("refreshToken");
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            await Refresh.deleteOne({ token: refreshToken });
        }
        res.status(201).json({
            msg:"Logout successfully"
        })    
    } catch (error) {
        console.log(error);
    }
}