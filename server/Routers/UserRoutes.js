import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  followUser,
} from "../Controllers/UserController.js";
const router = express.Router();

// get all the Users
router.get("/", getAllUsers);

// get single User
router.get("/:id", getSingleUser);

// create a new user
router.post("/register", createUser);

// create a new user
router.post("/login", loginUser);

// update a new User
router.put("/update/:id", updateUser);

// delete a  User
router.delete("/delete/:id", deleteUser);

//follow and unFollow users;
router.put("/:id/follow", followUser)

export default router;