import { Like } from '../models/likes.js';
import { Post } from '../../posts/models/posts.js';
import { User } from '../../users/models/users.js';
import { sendError } from '../lib/sendError.js';


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

        const _Post = await Post.findById(id);
        if (!_Post) return sendError(res, "Post non trouvé", 404);

        const userExist = await User.findOne({ userName });
        if (!userExist) {
        return sendError(res, "Utilisateur introuvable", 404);
    }

        const newLike = new Like({
            author: _Post.userName,
            userName_like: userName,
            post_id: id
          });
    
        _Post.likes = _Post.likes + 1;
        await _Post.save();
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
      const _Post = await Post.findById(id_post);
      _Post.likes = _Post.likes - 1;
      await likeToDelete.deleteOne();
      await _Post.save();
  
      res.status(200).json({ message: "Like supprimé avec succès" });
    } catch (err) {
      console.error("Erreur like:", err);
      sendError(res, "Erreur lors de la suppression du like", 500);
    }
  };

