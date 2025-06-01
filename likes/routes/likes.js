import express from 'express';
import { getLikes, liker, deleteLike, deleteLikeByPostId } from '../controller/likeController.js';

export const likeRouter  = express.Router();

export const likePrefix  = '/likes';

likeRouter.get('/', getLikes);
likeRouter.post('/add/:id', liker);
likeRouter.delete('/delete/:id', deleteLike);
likeRouter.delete('/post_id/:id', deleteLikeByPostId);
