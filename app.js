const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const port = process.env.PORT || 5000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      transports: ['websocket', 'polling'],
    },
  });

let interval;

io.on("connection", (socket) => {
    
   
    socket.on('join', (room) => {
      console.log(`Socket ${socket.id} joining ${room}`);
      socket.join(room);
      //let emi="00000tttt";
      //io.to(room).emit('requestPurchase', emi);
    });

    

    socket.on('requestUserFacebookEmit', (data) => {
      console.log("RoomData",data);
      io.to(data.Room).emit('userFacebookInfoSend', data.userInfo);
  });
  socket.on('requestUserFacebookFriendsEmit', (data) => {
    console.log("RoomData",data);
    io.to(data.Room).emit('userFacebookFriendSend', data.socketArray);
});
socket.on('DisconnectUser', (abcd) => {
  console.log("RoomData45",abcd);
  
  console.log(`Socket ${abcd} Leaving ${abcd}`);
});
});
io.on("disconnect", () => {
  console.log(socket.connected); // false
});


app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));