const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/posts", (req, res) => {
  res.send("Retrieved All Posts");
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  res.send(`Post Registered: ${title}`);
});

app.get("/posts/:id", (req, res) => {
  res.send(`${req.params.id} Im looking up posts`);
});

app.put("/posts/:id", (req, res) => {
  const { title, content } = req.body;
  res.send(`${req.params.id} I have modified post number. (${title}) `);
});

app.patch("/posts/:id", (req, res) => {
  res.send(
    `${req.params.id} The post corresponding to this number has been partially modified.`,
  );
});

app.delete("/posts/:id", (req, res) => {
  res.send(`${req.params.id} This post has been deleted.`);
});

app.listen(port, () => {
  console.log("Server is Running");
});
