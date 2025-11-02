import express from "express";
import { chatWithBot, getChatHistory } from "../controller/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, chatWithBot);
router.get("/history", protect, getChatHistory);

export default router;
