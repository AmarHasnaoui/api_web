import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { likeRouter, likePrefix  } from "./routes/likes.js";
import { mainRouter } from "./routes/main.js";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3002;

const mongoURL = "mongodb://localhost:27017/mydb";

mongoose.connect(mongoURL)
  .then(() => {
  console.log('connected successfully')
  })
  .catch((err) => {
    console.log('failed connection', err);
  })

app.use(likePrefix, likeRouter);

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});

export default app;