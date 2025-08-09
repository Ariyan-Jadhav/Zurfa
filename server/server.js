import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.get("/", (req, res) => {
  res.send("server is live");
});
app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.use("/api/ai", userRouter);

const PORT = process.env.PORT || 3000;

// Bind to 0.0.0.0 so other devices on the network can access
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
  console.log(`Access it from your network via: http://10.40.6.89:${PORT}`);
});
