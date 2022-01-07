const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const fs = require("fs");

const port = process.env.PORT || 4001;
const app = express();

app.get('/', (req, res) => {
    fs.writeFileSync("text", "testing");
    res.json({
        test: 'testing'
    })
})

app.use(cors({
    origin: 'http://localhost:3000'
}));

const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getTimer(socket), 1000);
    getFile(socket);
    socket.on("disconnect", () => {
    console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getTimer = (socket) => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

const getFile = (socket) => {
    const file = fs.readFileSync('text', 'utf-8');
    socket.emit("File", file ?? "testing");
};

server.listen(port, () => console.log(`Listening on port ${port}`));