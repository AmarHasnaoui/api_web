import express from 'express';
export const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.status(200).send("Le serveur est bien démarré.");
});