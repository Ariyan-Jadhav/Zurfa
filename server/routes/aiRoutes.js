import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlog,
  generateImage,
  removeBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();
aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlog);
aiRouter.post("/generate-image", auth, generateImage);
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeBackground
);
aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject
);
aiRouter.post("/resume-review", upload.single("resume"), auth, resumeReview);
export default aiRouter;
