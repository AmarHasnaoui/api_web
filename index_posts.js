import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter, userPrefix } from "./posts/routes/posts.js";
import { mainRouter } from "./posts/routes/main.js";

const app = express();

app.use(express.json());
app.use(cors());

const port = 3001;

const mongoURL = "mongodb://localhost:27017/mydb";

mongoose.connect(mongoURL)
  .then(() => {
  console.log('connected successfully')
  })
  .catch((err) => {
    console.log('failed connection', err);
  })

app.use(userPrefix, userRouter);

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});

export default app;