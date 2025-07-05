const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");
const authMiddleware = require("../middleware/auth"); // or your actual auth middleware

// Route: POST /api/timetable/generate
router.post("/generate", authMiddleware, timetableController.generateTimetable);

module.exports = router;
