import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  followUser,
  unFollowUser,
  userFriends,
} from "../Controllers/UserController.js";
const router = express.Router();

// get all the Users
router.get("/", getAllUsers);

// get single User
router.get("/:id", getSingleUser);

//get user friends
router.get("/friends/:id", userFriends);

// update a new User
router.put("/update/:id", updateUser);

// create a new user
router.post("/register", createUser);

// create a new user
router.post("/login", loginUser);

// get user friends
router.put("/update/:id", updateUser);

// delete a  User
router.delete("/delete/:id", deleteUser);

//follow and unFollow users;
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unFollowUser);

export default router;