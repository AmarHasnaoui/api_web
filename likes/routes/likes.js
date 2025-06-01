import express from 'express';
import { getLikes, liker, deleteLike } from '../controller/likeController.js';

export const userRouter = express.Router();

export const userPrefix = '/users';

userRouter.get('/likes', getLikes);
userRouter.get('/likes/add/:id', liker);
userRouter.post('/likes/delete/:id', deleteLike);
