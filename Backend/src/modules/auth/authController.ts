// import { Request, Response } from "express";
// import otpGenerator from "otp-generator"
// import crypto from 'crypto'
// import nodemailer from "nodemailer";
// import Mailgen from "mailgen";
// import { User } from "../user/userModel";
// import { findRefreshToken, generateToken, storeRefreshToken, updateRefreshToken, verifyRefreshToken } from "./tokenController";
// import { Refresh } from "./refreshModel";
// import jwt  from "jsonwebtoken";




// //Nodemailer
// const transport = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.EMAIL_ID,
//         pass:process.env.EMAIL_PASS
//     }
// })

// const generateOtp = async()=>{
//     try {
//         const otp = otpGenerator.generate(6,{digits:true,lowerCaseAlphabets: false,upperCaseAlphabets: false,specialChars: false});
//         return otp;
//     }catch (error){
//         console.log(error);
//     }
// }


// const generateOTPHash = (data: string) => {
//     return crypto
//       .createHmac('sha256', process.env.HASH_SECRET as string)
//       .update(data)
//       .digest('hex');
// }

// const verify=(hashedOTP:string,data:string)=>{
//     const newHashed = generateOTPHash(data);
//     return newHashed===hashedOTP
// }

// const mailGenerator = new Mailgen({
//   theme: "default",
//   product: {
//     name: "Book my screen",
//     link: "https://yourapp.com",
//   },
// });

// const sendOTPByMail = async (email:string,otp:string) => {
//   try {
//     const emailContent = {
//     body: {
//             name: '',
//             intro: 'Welcome to bookMyScreen! We\'re very excited to have you on board.',
//             action: {
//                 instructions: 'To verify your account, please use the following OTP:',
//                 button: {
//                     color: '#323232',
//                     text: otp,
//                     link: '#'
//                 }
//             },
//             outro: 'This OTP will expire in a short time (5 mins) for security reasons. If you did not request this OTP, please ignore this email.'
//         }
//     };
//     const html = mailGenerator.generate(emailContent);
//     await transport.sendMail({
//       from: process.env.EMAIL_ID,
//       to: email,
//       subject: "Your OTP Code",
//       html,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const verifyEmail = async(email:string)=>{
//     const regix =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regix.test(email);
// }


// //------------------------------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------

// //The main controller starts from here 

// export const sendOTP=async(req:Request,res:Response)=>{
//     try {
//         const {email} = req.body;
//         const tl =60*5*1000; //5min
//         const expires = Date.now()+tl;
//         if(!(await verifyEmail(email))){
//             return res.status(401).json({
//                 msg:"Enter a valid email"
//             })
//         }
//         const otp=await generateOtp();
//         const data = `${email}.${otp}.${expires}`
//         const hashedotp = generateOTPHash(data);
//         try {
//             await sendOTPByMail(email,otp!);
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//             msg:"Error in sendOTP endpoint"
//         })
//         }
//         return res.status(200).json({
//             hash:`${hashedotp}.${expires}`,
//             email,
//             msg:"OTP sent successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg:"Error in sendOTP endpoint"
//         })
//     }
// }

// export const verifyOtp=async(req:Request,res:Response)=>{
//     try {
//         const {hash,otp,email}=req.body;
//         if(!hash||!otp||!email){
//             return res.status(401).json({
//                 msg:"Please provide all credentials"
//             })
//         }
//         const [hashedOTP,expires]= hash.split(".");
//         if(Date.now()>+expires){
//             return res.status(410).json({
//                 msg:"OTP has been expired"
//             })
//         }
//         const data =`${email}.${otp}.${expires}`;
//         const isValid= verify(hashedOTP,data);
//         if(!isValid){
//             return res.status(404).json({
//                 msg:"Invalid otp"
//             })
//         }
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(401).json({
//                 msg:"No user found with this email pls signUp"
//             })
//         }
//         //Generate token
//         const {token,refreshToken }=await generateToken({_id:user._id,email:user.email,phone:user.phone});
//         await storeRefreshToken(refreshToken,user._id);
//         res.cookie("accessToken",token,{
//             maxAge:1000*60*60,
//             httpOnly:true,
//             sameSite:"none",
//             secure: true  
//         })
//         res.cookie("refreshToken",refreshToken,{
//             maxAge:1000*60*60,
//             httpOnly:true,
//             sameSite:"none",
//             secure: true  
//         })
//         res.json({auth:true,user});
//     }catch (error){
//         console.log(error);
//         return res.status(500).json({
//             msg:"Error in verifying OTP"
//         })
//     }
// }


// export const logout = async(req:Request,res:Response)=>{
//     try {
//         res.clearCookie('accessToken');
//         res.clearCookie("refreshToken");
//         const refreshToken = req.cookies.refreshToken;
//         if (refreshToken) {
//             await Refresh.deleteOne({ token: refreshToken });
//         }
//         res.status(201).json({
//             msg:"Logout successfully"
//         })    
//     } catch (error) {
//         console.log(error);
//     }
// }   

// export const refreshToken=async(req:Request,res:Response)=>{
//     try {
//         const {refreshToken:refreshTokFromCookie} = req.cookies
//         if(!refreshTokFromCookie){
//             return res.status(401).json({
//                 msg:"No refresh token found pls signUp again"
//             })
//         }
//         const decodedToken=verifyRefreshToken(refreshTokFromCookie);
//         if(!decodedToken){
//             return res.status(401).json({
//                 msg:"InValid refresh token unauthorized ascess"
//             })
//         }
//         try {
//             const tokenInDb=await findRefreshToken(decodedToken._id,refreshTokFromCookie);
//             if(!tokenInDb){
//                 return res.status(401).json({
//                     msg:"Token not found"
//                 })
//         }
//         } catch (error) {
//             console.log(error)
//             return res.status(500).json({
//                 msg:"Error in verifying token"
//             })
//         }

//         //agr token mil jata hai to we gonna generate new tokens
//         const {token,refreshToken}=generateToken({decodedToken._id})//May be yha pe 3 args as payload will pass id,email and phone


//         //new token generate krne ke baad update the refreshTok with this new one
//         await updateRefreshToken(decodedToken._id,refreshToken);

        
//         //after this just store in cookies
//         res.cookie("accessToken",token,{
//             maxAge:1000*60*60, //This gonna stay for 1 hr
//             httpOnly:true,
//             sameSite:"none",
//             secure: true  
//         })
//         res.cookie("refreshToken",refreshToken,{
//             maxAge:1000*60*60*24*30, //Refresh tokens gonna stay for like 1 month 
//             httpOnly:true,
//             sameSite:"none",
//             secure: true  
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg:"Error in refreshToken BE"
//         })
//     }
// }