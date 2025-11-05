import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import LessonPlan from "../models/lessonplaner.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Upload a new lesson plan
router.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const lessonPlan = new LessonPlan({
      user: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: `/uploads/${req.file.filename}`,
    });

    await lessonPlan.save();

    res.json({
      message: "File uploaded successfully",
      file: lessonPlan,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during upload" });
  }
});

// ✅ Get all uploaded lesson plans for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const plans = await LessonPlan.find({ user: req.user._id }).sort({
      uploadedAt: -1,
    });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
});

export default router;
