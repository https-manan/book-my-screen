import express from 'express';
import movieRoute from '../modules/movie/movieRoute'
const router = express.Router();
import theaterRoute from '../modules/theater/theaterRoute'

router.use('/movie',movieRoute)
router.use('/theater',theaterRoute)

export default router