const express = require("express");
const { MongoClient, ObjectId, ReturnDocument } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(express.json());

const url =
  "mongodb+srv://ameer:KoV0A6xWsCwMuirR@cluster0.lbblqjw.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);
const dbName = "memoDB";
let memoCollection;

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB connection was successful");
    const db = client.db(dbName);
    memoCollection = db.collection("memos");

    app.listen(PORT, () => {
      console.log("Server is Running");
    });
  } catch (error) {
    console.log("MongoDB connection failed!", error);
  }
}

startServer();

// GET /memos
// retrieve everything or filter by conditions
app.get("/memos", async (req, res) => {
  try {
    const { keyword } = req.query;
    let filter = {};

    if (keyword && keyword.trim() !== "") {
      filter = {
        text: { $regex: keyword.trim(), $options: "i" },
      };
    }

    const memos = await memoCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      count: memos.length,
      memos,
    });
  } catch (error) {
    console.log("memo retrieval error: ", error);
    res.status(500).json({
      success: false,
      message: "memo retrieval error",
    });
  }
});

// POST /memos
// return full list after adding a notes
app.post("/memos", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please enter the memo content",
      });
    }

    const newMemo = {
      text: text.trim(),
      createdAt: new Date(),
    };

    await memoCollection.insertOne(newMemo);

    const memos = await memoCollection.find().sort({ createdAt: -1 }).toArray();

    res.status(201).json({
      success: true,
      message: "the memo has been added",
      memos,
    });
  } catch (error) {
    console.error("There was a memory save error", error);
    res.status(500).json({
      success: false,
      message: "Server error has occured",
    });
  }
});

//PUT /memos/:id
//modify the entire resource
app.put("/memos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The format of the memo ID is incorrect.",
      });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please enter the content to modify the memo.",
      });
    }

    const result = await memoCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          text: text.trim(),
          updateAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "The memo with the specified ID cannot be found.",
      });
    }

    res.json({
      success: true,
      message: "The memo has been modified.",
      memo: result,
    });
  } catch (error) {
    console.error("Memo modification error.", error);
    res.status(500).json({
      success: false,
      message: "An error occured while modifying the memo.",
    });
  }
});

//PATCH /memos/id:
//partially modify the resource
app.patch("/memos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The format of the memo ID is incorrect.",
      });
    }

    if (text === undefined) {
      return res.status(400).json({
        success: false,
        message: "There is no items to modify.",
      });
    }

    if (typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "The text must be a non-empty string.",
      });
    }

    const result = await memoCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          text: text.trim(),
          updateAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "The memo with the specified ID cannot be found.",
      });
    }

    res.json({
      success: true,
      message: "The memo has been updated.",
      memo: result,
    });
  } catch (error) {
    console.error("Memo modification error.", error);
    res.status(500).json({
      success: false,
      message: "An error occured while modifying the memo.",
    });
  }
});

//DELETE /memos/id:
//remove the memo
app.delete("/memos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The memo ID format is invalid.",
      });
    }

    const result = await memoCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Cannot find the memo delete.",
      });
    }

    const memos = await memoCollection
      .find()
      .sort({
        createdAt: -1,
      })
      .toArray();

    res.json({
      success: true,
      message: "Deletion completed.",
      count: memos.length,
      memos,
    });
  } catch (error) {
    console.log("An error occured while deleting the current memo: ", error);
    res.status(500).json({
      success: false,
      message: "An error occured while deleting the memo",
    });
  }
});
