import express from 'express';
import { getUsers, createUsers, mdpOublie, resetMdp, login } from '../controller/userController.js';

export const userRouter = express.Router();

export const userPrefix = '/users';

userRouter.get('/users', getUsers);
userRouter.get('/users/create', createUsers);
userRouter.post('/forgot', mdpOublie);
userRouter.put('/reset', resetMdp);
userRouter.delete('/login', login);