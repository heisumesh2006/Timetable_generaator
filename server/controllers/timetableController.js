// controllers/timetableController.js

const Timetable = require("../models/Timetable");

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const theorySlotsMorning = ["9:00 - 10:00", "10:00 - 11:00"];
const theorySlotsAfternoon = ["2:00 - 3:00", "3:00 - 4:00"];
const teaBreak = "11:00 - 11:15";
const labSlot = "11:15 - 1:15";
const lunchBreak = "1:15 - 2:00";
const batches = ["Batch 1", "Batch 2", "Batch 3"];

exports.generateTimetable = async (req, res) => {
  try {
    const { ipccSubjects, theorySubjects, labSubjects } = req.body;

    // Validate input presence
    if (!ipccSubjects || !theorySubjects || !labSubjects) {
      return res.status(400).json({ success: false, message: "Subjects data is required" });
    }

    // Prepare theory subjects list by repeating each subject according to its credits
    let allTheorySubjects = [];

    ipccSubjects.forEach(sub => {
      for (let i = 0; i < sub.credits; i++) {
        allTheorySubjects.push({ name: sub.name, type: "IPCC" });
      }
    });

    theorySubjects.forEach(sub => {
      for (let i = 0; i < sub.credits; i++) {
        allTheorySubjects.push({ name: sub.name, type: "Theory" });
      }
    });

    // Shuffle the theory subjects randomly for distribution
    allTheorySubjects = allTheorySubjects.sort(() => Math.random() - 0.5);

    // Initialize timetable object and dailyUsed sets to track assigned subjects per day
    const timetable = {};
    const dailyUsed = {};
    let theoryIndex = 0;

    // Combine unique lab subjects from IPCC and labSubjects
    const labList = [...new Set([...ipccSubjects.map(s => s.name), ...labSubjects.map(s => s.name)])];
    let labAssignmentIndex = 0;

    DAYS.forEach(day => {
      timetable[day] = [];
      dailyUsed[day] = new Set();

      // Assign morning theory slots
      theorySlotsMorning.forEach(slot => {
        let assigned = false;
        while (theoryIndex < allTheorySubjects.length) {
          const sub = allTheorySubjects[theoryIndex++];
          if (!dailyUsed[day].has(sub.name)) {
            timetable[day].push(`⏰ ${slot} - ${sub.name} (${sub.type})`);
            dailyUsed[day].add(sub.name);
            assigned = true;
            break;
          }
        }
        if (!assigned) {
          timetable[day].push(`⏰ ${slot} - Free`);
        }
      });

      // Tea break
      timetable[day].push(`☕ Tea Break: ${teaBreak}`);

      // Assign lab sessions to batches in a round-robin manner
      const labAssignments = batches.map(() => {
        if (labList.length === 0) return "Free";
        const lab = labList[labAssignmentIndex % labList.length];
        labAssignmentIndex++;
        return lab;
      });

      timetable[day].push(`🧪 ${labSlot} - ${batches.map((b, i) => `${b}: ${labAssignments[i]}`).join(", ")}`);

      // Lunch break
      timetable[day].push(`🍱 Lunch Break: ${lunchBreak}`);

      // Assign afternoon theory slots
      theorySlotsAfternoon.forEach(slot => {
        let assigned = false;
        while (theoryIndex < allTheorySubjects.length) {
          const sub = allTheorySubjects[theoryIndex++];
          if (!dailyUsed[day].has(sub.name)) {
            timetable[day].push(`⏰ ${slot} - ${sub.name} (${sub.type})`);
            dailyUsed[day].add(sub.name);
            assigned = true;
            break;
          }
        }
        if (!assigned) {
          timetable[day].push(`⏰ ${slot} - Free`);
        }
      });
    });

    // Save generated timetable in DB, associating with logged-in user (req.user.userId)
    await Timetable.create({
      timetableData: timetable,
      user: req.user.userId,
    });

    return res.json({ success: true, timetable });
  } catch (error) {
    console.error("❌ Error generating timetable:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};  