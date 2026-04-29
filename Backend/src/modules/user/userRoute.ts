import express from 'express';
import { activateUser, createUser, getAllUsers, getUserById } from './userController';
import { isVerifiedUser } from '../../middleware/authMiddleware';
const route = express.Router();

route.post('/',createUser);
route.get('/',getAllUsers); 
route.get('/me',isVerifiedUser,getUserById); //and this and next one too so add auth middleware later here 
route.post('/activate/:id',isVerifiedUser,activateUser)


export default route;