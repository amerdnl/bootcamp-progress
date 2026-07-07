const express = require("express");
const path = require("path");
const { title } = require("process");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("This is the Homepage. Testing");
});

app.get("/user/:id", (req, res) => {
  res.send(`The requested User ID: ${req.params.id}.`);
});

app.get("/search", (req, res) => {
  const { keyword } = req.query;
  res.send(`Searched: ${keyword}`);
});

app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`Name: ${name}, Age: ${age}`);
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: "Ameer" });
});

app.get("/posts", (req, res) => {
  const posts = [
    { title: "This is the First Title", content: "First Content." },
    {
      title: "This is the Second Title",
      content: "Express is really convenient.",
    },
  ];
  res.render("posts", { posts });
});

app.listen(port, () => {
  console.log("Server is Running");
});
