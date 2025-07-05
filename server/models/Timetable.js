const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timetableData: {
      type: mongoose.Schema.Types.Mixed, // flexible for any kind of timetable object
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
