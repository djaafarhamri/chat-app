const Chat = require("../models/Chat");

module.exports.send_message = async (req, res) => {
  const { room, sender, message } = req.body;

  try {
    const chat = await Chat.findOne({ room });
    if (chat) {
      await Chat.findOneAndUpdate(
        { room },
        {
          $push: {
            messages: { sender, message },
          },
        },
        { new: true }
      );
    } else {
      await Chat.create({
        room,
        messages: [{ sender, message }],
      });
    }
    res.status(200).json({ sender, message });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.get_messages = async (req, res) => {
  const { room } = req.params;
  try {
    const chat = await Chat.findOne({ room });
    res.status(200).json({messages: chat.messages});
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
