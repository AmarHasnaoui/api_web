import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    post: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, required: true },
    modifie: { type: Number, default: 0 }
  });

export const Post = mongoose.model('Posts', postSchema);
