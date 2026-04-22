import express from 'express'
import { createMovie, getAllMovies, getMoviesById, getTopRecMovies } from './movieController';
import { upload } from '../../cloudinary/multer';
const route =express.Router();


route.post('/',upload.single('imagePath'),createMovie);
route.get('/all', getAllMovies);
route.get('/recommended', getTopRecMovies);
route.get('/:id', getMoviesById);

export default route;