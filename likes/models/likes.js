import mongoose from 'mongoose';


const likesSchema = new mongoose.Schema({
    author : { type: String, required: true },
    userName_like: { type: String, required: true },
    post_id: { type: String, required: true }
  });

export const Like = mongoose.model('Likes', likesSchema);

