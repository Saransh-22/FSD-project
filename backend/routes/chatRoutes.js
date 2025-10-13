import express from "express";
import { chatWithBot } from "../controller/chatController.js";

const router = express.Router();
router.post("/", chatWithBot);
export default router;
