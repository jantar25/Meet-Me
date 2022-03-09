const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const options = { /* options */ }

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ],
  }
 });
const PORT = 7000;



io.on("connection", (socket) => {
  console.log('Someone got connected with id: ' + socket.id)
  socket.on("disconnect", () => {
    console.log(`${socket.id} got disconnected`)
  });
});

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});