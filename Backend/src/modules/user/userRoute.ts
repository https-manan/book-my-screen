import express from 'express';
import { activateUser, createUser, getAllUsers, getUserById } from './userController';
const route = express.Router();

route.post('/',createUser);
route.get('/',getAllUsers); //This end point should be authorized
route.get('/:id',getUserById); //and this and next one too so add auth middleware later here 
route.post('/activate/:id',activateUser)


export default route;