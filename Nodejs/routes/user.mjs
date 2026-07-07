import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Middleware that exists in users");
  next();
});

// http://127.0.0.1:3000/users (GET)
// View member information
router.get("/", (req, res) => {
  res.status(200).send("GET: /users View member information");
});

// http://127.0.0.1:3000/users (POST)
// Sign up
router.post("/", (req, res) => {
  res.status(201).send("POST: /users Sign up");
});

// http://127.0.0.1:3000/users (PUT)
// Update User information
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /users/:id Update User information");
});

// http://127.0.0.1:3000/users (DELETE)
// Membership Withdrawal
router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /users/:id Membership Withdrawal");
});

export default router;
