const { Router } = require("express");
const chatController = require("../Controllers/chatController");
const router = Router();

// chat routes
router.post("/send_message", chatController.send_message);
router.get("/get_messages/:room", chatController.get_messages);

module.exports = router;