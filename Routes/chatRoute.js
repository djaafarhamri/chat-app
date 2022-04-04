const { Router } = require("express");
const chatController = require("../Controllers/chatController");
const router = Router();

// chat routes
router.post("/send_message", chatController.send_message);
router.get("/get_messages/:room", chatController.get_messages);
router.post("/update_last_online", chatController.update_last_online);

module.exports = router;