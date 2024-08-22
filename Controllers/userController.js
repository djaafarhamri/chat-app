const User = require("../Models/User");
const Chat = require("../Models/Chat");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid").v4;

module.exports.sign_up = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.create({ email, username, password });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "test", {
    expiresIn: maxAge,
  });
};

module.exports.sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (err) {
    const errors = console.log(err);
    res.status(400).json({ errors });
  }
};

module.exports.check_user = (req, res) => {
  if (req.currUser) {
    res.status(200).json({ user: req.currUser });
  } else {
    res.status(400).json("error");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json("logout");
  });
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
            friendRequests: { username: user.username },
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
    const userD = await User.findOne({ username: friend.username });
    if (userD.friends.some((e) => e.username === user.username)) {
      res.status(400).json("already friends");
    } else {
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
              _id: user._id,
              room,
            },
          },
        },
        { new: true }
      );
      await User.findOneAndUpdate(
        { username: user.username },
        { $pull: { friendRequests: { username: friend.username } } },
        { new: true }
      );
      await Chat.create({
        room,
        users: [{ username: user.username }, { username: friend.username }],
      });
      res.status(200).json({ friend: { ...friend, room } });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.decline_request = async (req, res) => {
  const { user, friend } = req.body;
  try {
    await User.findOneAndUpdate(
      { username: user.username },
      { $pull: { friendRequests: friend } }
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
      { $pull: { friends: friend } }
    );
    await User.findOneAndUpdate(
      { username: friend.username },
      {
        $pull: {
          friends: {
            username: user.username,
            room: friend.room,
          },
        },
      }
    );
    await Chat.findOneAndDelete({ room: friend.room });
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
    res.status(404).json("user not found");
  }
};
module.exports.get_friend_image = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    res.status(200).json({ image: user.image });
  } catch (error) {
    res.status(404).json("user not found");
  }
};

module.exports.get_friendRequests = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.status(200).json({ friendRequests: user?.friendRequests });
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
  const {
    username,
    currentUsername,
    firstName,
    lastName,
    editFirstName,
    editLastName,
    editUsername,
  } = req.body;
  if (editFirstName) {
    await User.findOneAndUpdate(
      { username: currentUsername },
      {
        first_name: firstName,
      },
      { new: true }
    );
  }
  if (editLastName) {
    await User.findOneAndUpdate(
      { username: currentUsername },
      {
        last_name: lastName,
      },
      { new: true }
    );
  }
  if (editUsername) {
    await User.findOneAndUpdate(
      { username: currentUsername },
      {
        username,
      },
      { new: true }
    );
  }
  res.status(200).json("success");
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
  res.status(200).json({ image: user.image });
};
