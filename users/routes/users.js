import express from 'express';
import { getUsers, createUsers, mdpOublie, resetMdp, login, UserExists } from '../controller/userController.js';

export const userRouter = express.Router();

export const userPrefix = '/users';

userRouter.get('/', getUsers);
userRouter.post('/create', createUsers);
userRouter.post('/forgot', mdpOublie);
userRouter.put('/reset', resetMdp);
userRouter.post('/login', login);
userRouter.get('/:userName/exists', UserExists);