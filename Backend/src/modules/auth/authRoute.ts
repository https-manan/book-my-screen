import express from 'express';
import { verifyOtp,sendOTP, logout, refreshToken} from './authController';
import { isVerifiedUser } from '../../middleware/authMiddleware';
const route = express.Router();

route.post("/send-otp",sendOTP);
route.post("/verify-otp",verifyOtp);
route.post('/logout',isVerifiedUser,logout);
route.get('/refresh-token',refreshToken); 



export default route;