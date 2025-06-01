import { Post } from '../models/posts.js';
import { sendError } from '../lib/sendError.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Get posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch(err){
    sendError(res, "Erreur lors de la récupération des posts", 500);
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { userName, post } = req.body;
    const date = Date.now()
    if (!userName || !post) {
      return sendError(res, "userName et post requis", 400);
    }

    const exists = await axios.get(`${process.env.USERS_URL}/users/${userName}/exists`);
    if (!exists.data.exists) {
            return res.status(404).json({ message: "Utilisateur introuvable dans users." });
        }

    const newPost = new Post({
      userName,
      post: post,
      likes: 0,
      date: date,
      modifie: 0
    });

    await newPost.save();

    res.status(201).json({
      message: "Post créé avec succès",
      newPost
    });

  } catch (err) {
    console.error("Erreur createPost:", err);
    sendError(res, "Erreur lors de la création du post", 500);
  }
};

// Modifier un post

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPost } = req.body;

    if (!newPost) {
      return sendError(res, "Le nouveau contenu du post est requis", 400);
    }

    const _Post = await Post.findById(id);
    if (!_Post) return sendError(res, "Post non trouvé", 404);


    _Post.post = newPost;
    _Post.modifie = 1;
    await _Post.save();

    res.status(200).json({ message: "Post mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur updatepost:", err);
    sendError(res, "Erreur lors de la mise à jour du post", 500);
  }
};

// Supprimer un post 

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postToDelete = await Post.findById(id);
    if (!postToDelete) return sendError(res, "Post non trouvé", 404);

    await postToDelete.deleteOne();

    await axios.delete(`${process.env.LIKES_URL}/likes/post_id/${id}`);

    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    console.error("Erreur deletePost:", err);
    sendError(res, "Erreur lors de la suppression du post", 500);
  }
};

// plus like
export const add_like = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) return sendError(res, "Post non trouvé", 404);

    post.likes = post.likes + 1
    await post.save();

    res.status(200).json({ message: "Like du Post incrémenté  avec succès" });
  } catch (err) {
    console.error("Erreur add_like:", err);
    sendError(res, "Erreur lors de l'ajout du like", 500);
  }
};

// moins like
export const delete_like = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) return sendError(res, "Post non trouvé", 404);

    post.likes = post.likes - 1
    await post.save();

    res.status(200).json({ message: "Like du Post décrémenté  avec succès" });
  } catch (err) {
    console.error("Erreur delete_like:", err);
    sendError(res, "Erreur lors de la suppression du like", 500);
  }
};

// get info post
export const get_post = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) return sendError(res, "Post non trouvé", 404);


    res.status(200).json(post);
  } catch (err) {
    console.error("Erreur get_post:", err);
    sendError(res, "Erreur lors de la recuperation du post", 500);
  }
};
