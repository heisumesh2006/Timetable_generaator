import React from "react";
import "./TimetableDisplay.css"; // optional for styles

const TimetableDisplay = ({ timetable }) => {
  if (!timetable || typeof timetable !== "object" || Array.isArray(timetable)) {
    return <p>No timetable data available</p>;
  }

  const days = Object.keys(timetable);
  const maxSlots = Math.max(...days.map(day => timetable[day].length));

  // Time slot labels shown only at top
  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 11:15",
    "11:15 - 1:15",
    "1:15 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00"
  ];

  return (
    <div className="timetable-container">
      <h2>Timetable</h2>
      <table className="timetable-table" border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.slice(0, maxSlots).map((slot, index) => (
              <th key={index}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td><strong>{day}</strong></td>
              {timetable[day].map((entry, index) => (
                <td key={index}>
                  {cleanCell(entry)}
                </td>
              ))}
              {/* Fill remaining cells if day has fewer slots */}
              {Array.from({ length: maxSlots - timetable[day].length }).map((_, i) => (
                <td key={`empty-${i}`}>-</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Clean emoji and timing from string
const cleanCell = (text) => {
  if (!text) return "-";

  // Keep "Tea Break" and "Lunch Break" as-is
  if (text.includes("Tea Break")) return "☕ Tea Break";
  if (text.includes("Lunch Break")) return "🍱 Lunch Break";

  // Remove emojis
  text = text.replace(/⏰|☕|🧪|🍱/g, '');

  // Remove time prefix like "9:00 - 10:00 - "
  text = text.replace(/^\s*[\d:]+(?:\s*-\s*[\d:]+)?\s*-\s*/g, '');

  // If it's a lab slot and doesn't start with "Batch", add Batch 1
  if (
    text.includes("Batch 2:") &&
    !text.includes("Batch 1:") &&
    !/^Batch \d+:/.test(text.trim())
  ) {
    // Extract the first subject before "Batch 2"
    const [first, rest] = text.split("Batch 2:");
    return `Batch 1: ${first.trim()}, Batch 2: ${rest.trim()}`;
  }

  return text.trim();
};


export default TimetableDisplay;
