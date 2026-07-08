const express = require("express");
const { error } = require("node:console");
const app = express();

app.use(express.json());

app.post("/user", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Required value is missing" });
  }
  res.status(201).json({
    message: "Registration Complete",
    data: { name, age },
  });
});

app.get("/user/:id", (req, res) => {
  res.json({
    id: req.params.id,
    message: "User Retrieval",
  });
});

app.put("/user/:id", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Required value is missing" });
  }
  res.json({
    message: "Full Modification has been completed",
    id: req.params.id,
    data: { name, age },
  });
});

app.patch("/user/:id", (req, res) => {
  const updates = req.body;
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No Data Modify" });
  }
  res.json({
    message: "Partial Modification has been completed",
    id: req.params.id,
    updateData: updates,
  });
});

app.delete("/user/:id", (req, res) => {
  res.json({
    message: "Deletion Completed",
    id: req.params.id,
  });
});

app.listen(3000, () => {
  console.log("Server is Running");
});
