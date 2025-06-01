import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controller/postController.js';

export const userRouter = express.Router();

export const userPrefix = '/posts';

userRouter.get('/', getPosts);
userRouter.post('/create', createPost);
userRouter.put('/update/:id', updatePost);
userRouter.delete('/delete/:id', deletePost);
