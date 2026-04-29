import express from 'express';
import { verifyOtp,sendOTP, logout} from './otpController';
import { isVerifiedUser } from '../../middleware/authMiddleware';
const route = express.Router();

route.post("/send-otp",sendOTP);
route.post('/verify-otp',verifyOtp);
route.get('/logout',isVerifiedUser,logout);


export default route;