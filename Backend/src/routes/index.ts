import express from 'express';
import movieRoute from '../modules/movie/movieRoute'
const router = express.Router();
import theaterRoute from '../modules/theater/theaterRoute'
import showRoute from '../modules/show/showRoute'
import userRoute from '../modules/user/userRoute'
import authRoute from '../modules/auth/authRoute'



router.use('/movie',movieRoute)
router.use('/theater',theaterRoute)
router.use('/show',showRoute)
router.use('/user',userRoute)
router.use('/auth',authRoute)


export default router;