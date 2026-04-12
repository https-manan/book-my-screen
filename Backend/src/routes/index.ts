import express from 'express';
import movieRoute from '../modules/movie/movieRoute'
const router = express.Router();
import theaterRoute from '../modules/theater/theaterRoute'
import showRoute from '../modules/show/showRoute'

router.use('/movie',movieRoute)
router.use('/theater',theaterRoute)
router.use('/show',showRoute)

export default router