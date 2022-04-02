const User = require("../models/User");
const Chat = require("../models/Chat");
const uuidv4 = require('uuid').v4;

module.exports.sign_up = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.sign_in = (req, res) => {};

module.exports.success_login = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports.failed_login = (req, res) => {
  res.status(400).json("error");
};

module.exports.check_user = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(400).json("error");
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.status(200).json("logout");
};

module.exports.send_request = async (req, res) => {
  const { user, friend } = req.body;
  try {
    const userD = await User.findOne({ username: friend.username });
    if (userD.friendRequests.some((e) => e.username === user.username)) {
      res.status(400).json("already sent");
    } else if (userD.friends.some((e) => e.username === user.username)) {
      res.status(400).json("already sent 2");
    } else {
      await User.findOneAndUpdate(
        { username: friend.username },
        {
          $addToSet: {
            friendRequests: { username: user.username, image: user.image },
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  res.status(200);
};

module.exports.accept_request = async (req, res) => {
  const { user, friend } = req.body;
  const room = uuidv4();
  try {
    await User.findOneAndUpdate(
      { username: user.username },
      { $addToSet: { friends: { ...friend, room } } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { username: friend.username },
      {
        $addToSet: {
          friends: {
            username: user.username,
            image: user.image,
            _id: user._id,
            room,
          },
        },
      },
      { new: true }
    );
    await User.findOneAndUpdate(
      { username: user.username },
      { $pull: { friendRequests: friend } },
      { new: true }
    );
    await Chat.create({
      room,
      users: [user._id, friend._id],
    });
    res.status(200).json({ friend });
  } catch (error) {
    res.status(400).json(error);
  }

  res.status(200);
};

module.exports.decline_request = async (req, res) => {
  const { user, friend } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: user.username },
      { $pull: { friendRequests: friend } },
    );
    res.status(200).json({ friend });
  } catch (error) {
    res.status(400).json(error);
  }
  // res.status(200).json({ friend });
};

module.exports.delete_friend = async (req, res) => {
  const { user, friend } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: user.username },
      { $pull: { friends: friend } },
    );
    await User.findOneAndUpdate(
      { username: friend.username },
      { $pull: { friends: { username: user.username, image: user.image, _id: user._id } } },
    );
    res.status(200).json({ friend });
  } catch (error) {
    res.status(400).json(error);
  }
  // res.status(200).json({ friend });
};

module.exports.get_friends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(404).json('user not found');
  }
};

module.exports.get_friendRequests = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.status(200).json({ friendRequests: user.friendRequests });
};
// search with regex
module.exports.search_users = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400);
  const user = await User.find({
    username: { $regex: username, $options: "i" },
  });
  if (!user) return res.status(400);
  res.status(200).json({ users: user });
};

//change username
module.exports.change_username = async (req, res) => {
  const { username, currentUsername } = req.body;
  const user = await User.findOneAndUpdate(
    { username: currentUsername },
    { username },
    { new: true }
  );
  res.status(200).json({ user });
};

//change picture
module.exports.change_picture = async (req, res) => {
  const { username } = req.body;
  const image = req.file.path;
  const user = await User.findOneAndUpdate(
    { username },
    { image },
    { new: true }
  );
  console.log("file : ", req.file);
  res.status(200).json({image: user.image});
};
