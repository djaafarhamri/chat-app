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
.connect("mongodb://localhost:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("data base connecte");
    server.listen(PORT, () => {
      console.log("listening on PORT : ", PORT);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });

// app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "X-HTTP-Method-Override, Accept, Authorization, Content-Type, X-Requested-With, Range"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    } else {
      return next();
    }
  });
  //app.use(cors())
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
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
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join", (data) => {
    console.log(data);
    socket.join(data.room);
  });
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.to(data.room).emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
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

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(userRoute);
app.use(chatRoute);
