import express from 'express';
const router = express.Router();
import movieRoute from '../modules/movie/movieRoute'
import theaterRoute from '../modules/theater/theaterRoute'
import showRoute from '../modules/show/showRoute'
import userRoute from '../modules/user/userRoute'
import authRoute from '../modules/auth/authRoute'
import paymentRoute from '../modules/payment/paymentRoute'


router.use('/movie',movieRoute)
router.use('/theater',theaterRoute)
router.use('/show',showRoute)
router.use('/user',userRoute)
router.use('/auth',authRoute)
router.use('/payment',paymentRoute)


export default router;