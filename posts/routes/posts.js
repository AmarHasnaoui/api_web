import express from 'express';
import { getPosts, createPost, updatePost, deletePost, add_like, delete_like, get_post } from '../controller/postController.js';

export const postRouter = express.Router();

export const postPrefix = '/posts';

postRouter.get('/', getPosts);
postRouter.post('/create', createPost);
postRouter.put('/update/:id', updatePost);
postRouter.delete('/delete/:id', deletePost);
postRouter.put('/:id/plusLike', add_like);
postRouter.put('/:id/moinsLike', delete_like);
postRouter.get('/:id', get_post);