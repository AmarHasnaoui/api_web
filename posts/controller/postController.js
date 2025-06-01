import { Post } from '../models/posts.js';
import { User } from '../../users/models/users.js';
import { sendError } from '../lib/sendError.js';


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

    const userExist = await User.findOne({ userName });
    if (!userExist) {
      return sendError(res, "Utilisateur introuvable", 404);
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

    const _Post = await Post.findById({id});
    if (!_Post) return sendError(res, "Post non trouvé", 404);


    _Post.post = newPost;
    _Post.modifie = 1;
    await _Post.save();

    res.status(200).json({ message: "Post mis à jour avec succès" });
  } catch (err) {
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

    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    sendError(res, "Erreur lors de la suppression du post", 500);
  }
};
