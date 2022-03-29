const User = require("../models/User");

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
  const { username, friend } = req.body;
  try {
    await User.findOneAndUpdate(
      { username },
      {
        $push: {
          friendRequests: { username: friend.username, image: friend.image },
        },
      },
      { new: true }
    );
    console.log(username,  friend);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  res.status(200);
};

module.exports.accept_request = async (req, res) => {
  const { username, friend } = req.body;
  console.log(" username: ", username, " friend: ", friend);
  try {
    console.log(" friend: ", friend);
    await User.findOneAndUpdate(
      { username },
      { $push: { friends: friend } },
      { new: true }
    );
    console.log(" friend: ", friend);
    await User.findOneAndUpdate(
      { username: friend },
      { $push: { friends: username } },
      { new: true }
    );
    console.log(" friend: ", friend);
    await User.findOneAndUpdate(
      { username },
      { $pull: { friendRequests: friend } },
      { new: true }
    );
  } catch (error) {
    res.status(400).json(error);
  }

  res.status(200);
};

module.exports.decline_request = async (req, res) => {
  const { username, friend } = req.body;
  await User.findOneAndUpdate(
    { username },
    { $pull: { friendRequests: friend } },
    { new: true }
  );
  res.status(200);
};

module.exports.get_friends = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.status(200).json({ friends: user.friends });
};

module.exports.get_friendRequests = async (req, res) => {
  const { username } = req.params;
  console.log(username);
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
