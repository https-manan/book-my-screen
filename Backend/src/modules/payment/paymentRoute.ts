import { Router } from "express";
import { createOrders, verifyPaments } from "./paymentController";
import { isVerifiedUser } from "../../middleware/authMiddleware";

const route = Router();

route.post("/create-order",isVerifiedUser,createOrders)
route.post("verify-payment",isVerifiedUser,verifyPaments)



export default route;