import express from 'express';
import { activateUser, createUser, findUserByEmail, getAllUsers, getUserById } from './userController';
import { isVerifiedUser } from '../../middleware/authMiddleware';
const route = express.Router();

route.post('/',createUser);
route.get('/',getAllUsers); 
route.post('/email',findUserByEmail)
route.get('/me',isVerifiedUser,getUserById); 
route.post('/activate/:id',isVerifiedUser,activateUser)


export default route;