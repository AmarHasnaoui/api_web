import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controller/postController.js';

export const userRouter = express.Router();

export const userPrefix = '/users';

userRouter.get('/posts', getPosts);
userRouter.get('/posts/create', createPost);
userRouter.post('/posts/update/:id', updatePost);
userRouter.put('/posts/delete/:id', deletePost);
