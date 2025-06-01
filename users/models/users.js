import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpires: Date
});

export const User = mongoose.model('Users', userSchema);
