const { error } = require("console");
const express = require("express");
const { read, readdir } = require("fs");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/user.json");

async function readDB() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

async function writeDB(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// POST (create)
router.post("/", async (req, res) => {
  const { id, name, age } = req.body;

  if (!id || !name || !age) {
    return res.status(400).json({ error: "Value is Missing" });
  }

  const db = await readDB();
  db[id] = { name, age };
  await writeDB(db);
  res.json({ message: "save completed", data: db[id] });
});

//GET (read)
router.get("/:id", async (req, res) => {
  const db = await readDB();
  const user = db[req.params.id];
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }
  res.json(user);
});

//PUT (Full modification)
router.put("/:id", async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Required value is Missing" });
  }
  const db = await readDB();
  if (!db[req.params.id]) {
    return res.status(404).json({ error: "User Not Found" });
  }
  db[req.params.id] = { name, age };
  await writeDB(db);
  res.json({ message: "complete revision", data: db[req.params.id] });
});

//PATCH (Partial modification)
router.patch("/:id", async (req, res) => {
  const db = await readDB();

  if (!db[req.params.id]) {
    return res.status(404).json({ error: "User Not Found" });
  }

  db[req.params.id] = {
    ...db[req.params.id],
    ...req.body,
  };
  await writeDB(db);
  res.json({
    message: "Partial modification completed",
    data: db[req.params.id],
  });
});

//DELETE (Remove data)
router.delete("/:id", async (req, res) => {
  const db = await readDB();

  if (!db[req.params.id]) {
    return res.status(404).json({ error: "User Not Found" });
  }
  delete db[req.params.id];
  await writeDB(db);
  res.json({ message: "Deletion completed" });
});

module.exports = router;
