const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/user") {
    const user = {
      name: "Ameer",
      age: 23,
      job: "Developer",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is Running");
});
