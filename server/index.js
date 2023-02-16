import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import { connectDB } from "./DB/connect.js";
import postRouter from "./Routers/postRouter.js";
import userRouter from "./Routers/UserRoutes.js";
import commentRouter from "./Routers/comments.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// image path 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/upload", express.static(path.join(__dirname, "/upload")))

// db connection
mongoose.set("strictQuery", true);
connectDB();

// upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been successfully uploaded");
});

// post route
app.use("/api/post", postRouter);

// user route
app.use("/api/user", userRouter);

// user route
app.use("/api/comment", commentRouter);

app.listen(port, () => {
  console.log(`App is live using port ${port}`);
});
