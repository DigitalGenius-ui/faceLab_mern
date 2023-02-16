import { User } from "../DB/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get all User
export const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(401).json(error);
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const getUser = await User.findById(id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// register user
export const createUser = async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: newPassword,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(404).json("This user is not exist");
    }

    let isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(404).json("wrong password!!");
    }

    if (user) {
      const userId = user._id;
      const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
        expiresIn: "15d",
      });
      const { password, ...others } = user._doc;
      res.status(200).json({ userId, ...others, accessToken });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

// follow unFollow
export const followUser = async (req, res) => {
  const userToFollowId = req.params.id;
  const currentUserId = req.body.userId;

  try {
    const user = await User.findById(userToFollowId);
    const currentUser = User.findById(currentUserId);

    if (user.follows.includes(currentUserId)) {
      await user.updateOne({ $pull: { followers: currentUserId } });
      await currentUser.updateOne({ $pull: { follows: userToFollowId } });
      res.status(200).json("User has been unFollowed");
    } else {
      await user.updateOne({ $push: { follows: currentUserId } });
      await currentUser.updateOne({ $push: { followers: userToFollowId } });
      res.status(200).json("User has been followed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
