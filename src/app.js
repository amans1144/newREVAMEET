let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./ws/stream");
let path = require("path");
let favicon = require("serve-favicon");

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/start", (req, res) => {
  res.sendFile(__dirname + "/startingclass.html");
});

io.of("/stream").on("connection", stream);

server.listen(3000);
console.log("server is running on port 3000");
