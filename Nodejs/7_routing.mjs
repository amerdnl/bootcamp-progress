import express from "express";
import userRouter from "./routes/user.mjs";
import postRouter from "./routes/post.mjs";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3000);
