import Razorpay from "razorpay";
import { IPaymentdata, IVerifyPayment } from "./paymentInterface";
import crypto from 'crypto'
import { Request, Response } from "express";

const createOrder=async(paymentdata:IPaymentdata)=>{
    const razorpay=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
    const {amount}=paymentdata;
    const option={
        amount:amount*100,//Amount ko paise mai bhajenge
        currency:"INR",
        receipt:`BMS-ticket_${Date.now()}`
    }
    const orders=await razorpay.orders.create(option);
    return orders;
}

const verifyPament=async(paymentdata:IVerifyPayment)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=paymentdata;
    const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET as string)
    .update(razorpay_order_id+"|"+razorpay_payment_id).digest('hex')
    return expectedSignature===razorpay_signature //means payment is verified
} 



//////////////////////////////////////////////////Main controller

export const createOrders=async(req:Request,res:Response)=>{
    try {
        const order=createOrder(req.body);
        res.status(200).json({order});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
}

export const verifyPaments=async(req:Request,res:Response)=>{
    try {
        const isVerified=await verifyPament(req.body);
        if(!isVerified){
            return res.status(404).json({
                success:false,
                msg:"Payment verification failed."
            })
        }
        return res.status(200).json({
            success:true,
            msg:"Payment verification completed."
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
}