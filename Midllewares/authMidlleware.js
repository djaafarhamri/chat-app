const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dotenv = require("dotenv");
dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "test", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400);
      } else {
        next();
      }
    });
  } else {
    res.json("object");
  }
};
// require admin
const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('cookies: ', req.cookies.jwt);
  // check json web token exists & is verified
  if (token !== undefined) {
    jwt.verify(token, "test", async (err, decodedToken) => {
      let admin = await User.findById(decodedToken.id);
      if (err || admin.role !== "admin") {
        if (err) console.log(err.message);
        console.log("not admin");
        res.status(400).json("not admin");
      } else {
        next();
      }
    });
  } else {
    console.log("no token");
    res.status(400).json("no token found");
  }
};
// require manager
const requireManager = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    console.log('token');
    jwt.verify(token, "test", async (err, decodedToken) => {
      let admin = await User.findById(decodedToken.id);
      if (!err && (admin.role === "vendeur" || admin.role === "admin")) {
        next();
      } else {
        if (err) console.log(err.message);
        res.status(400).json("not manager");
      }
    });
  } else {
    res.status(400).json("no token found");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('token: ', token)
  if (token) {
    jwt.verify(token, "test", async (err, decodedToken) => {
      if (err) {
        req.currUser = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        req.currUser = user;
        next();
      }
    });
  } else {
    req.currUser = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, requireAdmin, requireManager };