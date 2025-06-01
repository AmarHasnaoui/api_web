import { Like } from '../models/likes.js';
import { sendError } from '../lib/sendError.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


// Get likes
export const getLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    res.status(200).json(likes);
  } catch(err){
    sendError(res, "Erreur lors de la récupération des likes", 500);
  }
};

// Create a new like
export const liker = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;
    
        if (!userName) {
          return sendError(res, "L'utilisateur qui a like le post est requis", 400);
        }
        const alreadyLiked = await Like.findOne({ post_id: id, userName_like: userName });
        if (alreadyLiked) return sendError(res, "Vous avez déjà liké ce post", 409);
        
        const exists = await axios.get(`${process.env.USERS_URL}/users/${userName}/exists`);
        if (!exists.data.exists) {
            return res.status(404).json({ message: "Utilisateur introuvable dans users." });
        }
        
        const post_info = await axios.get(`${process.env.POSTS_URL}/posts/${id}`);

        await axios.put(`${process.env.POSTS_URL}/posts/${id}/plusLike`);
        
    

        const newLike = new Like({
            author: post_info.data.userName,
            userName_like: userName,
            post_id: id
          });
    
        await newLike.save();
    
        res.status(201).json({ message: "Like ajouté avec succès" });
      }
    catch (err) {
        console.error("Erreur like:", err);
        sendError(res, "Erreur lors de la création du like", 500);
  }
};

// Supprimer un like 

export const deleteLike = async (req, res) => {
    try {
      const { id } = req.params;
  
      const likeToDelete = await Like.findById(id);
      if (!likeToDelete) return sendError(res, "Like non trouvé", 404);

      const id_post = likeToDelete.post_id
      await axios.put(`${process.env.POSTS_URL}/posts/${id_post}/moinsLike`);
      await likeToDelete.deleteOne();
  
      res.status(200).json({ message: "Like supprimé avec succès" });
    } catch (err) {
      console.error("Erreur like:", err);
      sendError(res, "Erreur lors de la suppression du like", 500);
    }
  };

// supprimer tout les like sur un poste
export const deleteLikeByPostId = async (req, res) => {
    try {
      const { id } = req.params;
  
      await Like.deleteMany({ post_id: id });
  
      res.status(200).json({ message: "Likes du post supprimé avec succès" });
    } catch (err) {
      console.error("Erreur :", err);
      sendError(res, "Erreur lors de la suppression des likes", 500);
    }
  };

