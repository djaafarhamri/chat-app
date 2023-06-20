const { Router } = require("express");
const User = require("../Models/User");
const userController = require("../Controllers/userController");
const router = Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const upload = require("../Midllewares/upload");
const validation = require("../Midllewares/validation");
const { checkUser, requireAuth } = require("../Midllewares/authMidlleware");

router.post("/sign_up", userController.sign_up);
router.post("/sign_in", userController.sign_in);
router.get("/check-user", checkUser, userController.check_user);
router.get("/logout", userController.logout);

//* Friends

router.post("/send_request", userController.send_request);
router.post("/accept_request", userController.accept_request);
router.post("/decline_request", userController.decline_request);
router.post("/delete_friend", userController.delete_friend);
router.get("/get_friends/:username", userController.get_friends);
router.get("/get_friend_image/:username", userController.get_friend_image);
router.get("/get_friendRequests/:username", userController.get_friendRequests);
router.get("/search_users/:username", userController.search_users);

//* Profile

router.post("/change_username", userController.change_username);
router.post(
  "/change_picture",
  upload,
  validation,
  userController.change_picture
);

module.exports = router;
