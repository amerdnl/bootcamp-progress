const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the Homepage");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the Introduction");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("page cannot be found");
  }
});

server.listen(3000, () => {
  console.log("Server is Running");
});
