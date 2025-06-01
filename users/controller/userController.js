import { User } from '../models/users.js';
import { sendError } from '../lib/sendError.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Get users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(err){
    sendError(res, "Erreur lors de la récupération des utilisateurs", 500);
  }
};

// Create a new user
export const createUsers = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return sendError(res, "userName et password requis", 400);
    }

    const existUser = await User.findOne({ userName });
    if (existUser) {
      return sendError(res, "Utilisateur déjà existant", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpires: undefined
    });

    await newUser.save();

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      newUser
    });

  } catch (err) {
    sendError(res, "Erreur lors de la création de l'utilisateur", 500);
  }
};

// Mot de passe oublié
export const mdpOublie = async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return sendError(res, "Nom d'utilisateur requis", 400);
    }

    const user = await User.findOne({ userName });
    if (!user) return sendError(res, "Utilisateur non trouvé", 404);

    const token = crypto.randomBytes(20).toString('hex');
    
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({ message: "Lien de réinitialisation généré", token });
  } catch (err) {
    console.error("Erreur mdpOublie:", err);
    sendError(res, "Erreur lors de la demande de réinitialisation", 500);
  }
};

// Réinitialisation du mot de passe
export const resetMdp = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return sendError(res, "Token et nouveau mot de passe requis", 400);
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) return sendError(res, "Lien invalide ou expiré", 403);

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    sendError(res, "Erreur lors de la réinitialisation", 500);
  }
};

// Connexion 
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return sendError(res, "userName et password requis", 400);
    }

    const user = await User.findOne({ userName });
    if (!user) return sendError(res, "Utilisateur introuvable", 404);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return sendError(res, "Mot de passe incorrect", 401);

    res.status(200).json({ message: "Connexion réussie", user });
  } catch (err) {
    sendError(res, "Erreur lors de la connexion", 500);
  }
};
