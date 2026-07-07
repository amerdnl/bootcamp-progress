const http = require("http");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home");
  } else if (pathname === "/user") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("User");
    // http://127.0.0.1/user?userid=ameer&name=AmeerDanial
    console.log(myUrl.searchParams.get("userid"));
    console.log(myUrl.searchParams.get("name"));
  } else if (pathname === "/member") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Member");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is Running");
});
