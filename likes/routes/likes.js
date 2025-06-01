import express from 'express';
import { getLikes, liker, deleteLike } from '../controller/likeController.js';

export const userRouter = express.Router();

export const userPrefix = '/likes';

userRouter.get('/', getLikes);
userRouter.post('/add/:id', liker);
userRouter.delete('/delete/:id', deleteLike);
