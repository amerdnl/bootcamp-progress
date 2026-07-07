import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Middleware that exists in posts");
  next();
});

// http://127.0.0.1:3000/posts (GET)
// View posts
router.get("/", (req, res) => {
  res.status(200).send("GET: /posts View the posts");
});

// http://127.0.0.1:3000/posts (POST)
// Create a post
router.post("/", (req, res) => {
  res.status(201).send("POST: /posts Create a post");
});

// http://127.0.0.1:3000/posts (PUT)
// Edit post
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /posts/:id Edit post");
});

// http://127.0.0.1:3000/posts (DELETE)
// Remove post
router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /:id to delete that post");
});

export default router;
