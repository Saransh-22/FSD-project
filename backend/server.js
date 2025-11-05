import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import router from "./routes/uploadroute.js";

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",  // your React app URL
  credentials: true,                // allow cookies/auth headers
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload",router);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
