const { Router } = require("express");
const User = require("../models/User");
const userController = require("../Controllers/userController");
const router = Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
var LocalStrategy = require("passport-local");

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    User.findOne({ username: username }, async (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth)
        return cb(null, false, { message: "Incorrect username or password." });
      return cb(null, user);
    });
  })
);

router.post("/sign_up", userController.sign_up);
router.post(
  "/sign_in",
  passport.authenticate("local", {
    successRedirect: "/success_login",
    failureRedirect: "/failed_login",
  }),
  userController.sign_in
);
router.get("/success_login", userController.success_login);
router.get("/failed_login", userController.failed_login);
router.get("/check-user", userController.check_user);
router.get("/logout", userController.logout);

//* Friends 

router.post("/send_request", userController.send_request);
router.post("/accept_request", userController.accept_request);
router.post("/decline_request", userController.decline_request);
router.get("/get_friends/:username", userController.get_friends);
router.get("/get_friendRequests/:username", userController.get_friendRequests);
router.get("/search_users/:username", userController.search_users);


module.exports = router;
