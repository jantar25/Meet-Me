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
const users = {};


io.on("connection", (socket) => {
  console.log('Someone got connected with id: ' + socket.id)
  socket.on("disconnect", () => {
    console.log(`${socket.id} got disconnected`)
    for(let user in users){
      if(users[user] === socket.id){
        delete users[user]
      }
    }
  });
  socket.on("new_user", (currentUser) =>{
    users[currentUser] = socket.id;
    io.emit("AllUsers",users)
  })
  socket.on("SendMessage", (data) => {
    const receiver=data.receiver;
    const socketId = users[receiver];
    io.to(socketId).emit("newMessage",data)
    console.log(data)
    console.log(socketId)
  });
});

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});