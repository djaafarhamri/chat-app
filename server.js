const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const socket = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const session = require("express-session");

mongoose
  .connect(
    `mongodb+srv://hamridjaafar:${process.env.MONGODB_PASSWORD}@cluster0.jj0ux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("data base connecte");
    server.listen(PORT, () => {
      console.log("listening on PORT : ", PORT);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });

app.use(
  cors({
    origin: [
      "https://chat-app.djaafarhamri.com",
      "https://www.chat-app.djaafarhamri.com",
      "http://localhost:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow cookies and credentials
    optionsSuccessStatus: 204, // some legacy browsers choke on 204
  })
);
//app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(
//   session({
//     name: "chat-user",
//     keys: ["key2"],

//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

//* socket connection
const io = socket(server, {
  cors: {
    origin: [
      "https://chat-app.djaafarhamri.com",
      "https://www.chat-app.djaafarhamri.com",
      "http://localhost:5173",
    ],
    methods: ["GET, POST"],
    credentials: true,
  },
});
var online_users = [];
io.on("connection", (socket) => {
  socket.on("online_user", (data) => {
    online_users.push({ username: data.username, socket_id: socket.id });
    socket.broadcast.emit("new_online_user");
  });
  socket.on("get_online_friend", (data) => {
    const username = online_users.find(
      (user) => user.username === data.username
    );
    if (username) {
      io.emit("online_friend", username);
    }
  });

  console.log("user connected");
  socket.on("join", (data) => {
    socket.join(data.room);
  });
  socket.on("sendMessage", (data) => {
    io.in(data.room).emit("receiveMessage", {
      sender: data.sender,
      message: data.message,
      time: data.time,
    });
  });
  socket.on("friend-request", (data) => {
    var friend_id = online_users.find(
      (user) => user.username === data.friend.username
    );
    if (friend_id) {
      io.to(friend_id.socket_id).emit("friend-request-received", {
        sender: data.user,
      });
    }
  });
  socket.on("friend-request-accepted", (data) => {
    var friend_id = online_users.find(
      (user) => user.username === data.friend?.username
    );
    if (friend_id) {
      io.to(friend_id.socket_id).emit("friend-request-accepted-received", {
        sender: data.user,
      });
    }
  });
  //seen
  socket.on("seen_user", (data) => {
    io.in(data.room).emit("seen_server", {
      receiver: data.receiver,
      time: data.time,
    });
  });
  // leave room
  socket.on("leave", (data) => {
    socket.leave(data.room);
  });
  socket.on("logout", (data) => {
    online_users = online_users.filter((e) => e.socket_id !== socket.id);
    const username = online_users.map((user) => {
      if (user.socket_id === socket.id) return user.username;
    });
    if (username) {
      io.emit("offline_friend", { username: username.username });
    }
    console.log("user disconnected");
  });

  socket.on("disconnect", () => {
    online_users = online_users.filter((e) => e.socket_id !== socket.id);
    const username = online_users.map((user) => {
      if (user.socket_id === socket.id) return user.username;
    });
    if (username) {
      io.emit("offline_friend", { username: username.username });
    }
    console.log("user disconnected");
  });
});

app.use(
  session({
    secret: "Any normal Word", //decode or encode session
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 1000,
    },
  })
);

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

app.use(passport.initialize());
app.use(passport.session());
