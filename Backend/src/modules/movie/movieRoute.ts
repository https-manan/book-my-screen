import express from 'express'
import { createMovie, getAllMovies, getMoviesById, getTopRecMovies } from './movieController';
const route =express.Router();

route.post('/createMovie', createMovie);
route.get('/all', getAllMovies);
route.get('/:id', getMoviesById);
route.get('/recommended', getTopRecMovies);

export default route;  