import React, { useState } from "react";
import TimetableDisplay from "./TimetableDisplay"; // if needed

function TimetableForm({ setTimetable }) {
  const [ipccSubjects, setIpccSubjects] = useState([]);
  const [theorySubjects, setTheorySubjects] = useState([]);
  const [labSubjects, setLabSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [credits, setCredits] = useState(1);
  const [type, setType] = useState("IPCC");

  const handleAdd = () => {
    if (!subjectName) return alert("Subject name is required");

    const subject = { name: subjectName, credits: credits };
    if (type === "IPCC") setIpccSubjects([...ipccSubjects, subject]);
    else if (type === "Theory") setTheorySubjects([...theorySubjects, subject]);
    else setLabSubjects([...labSubjects, subject]);

    setSubjectName("");
    setCredits(1);
  };

  const handleRemove = (type, index) => {
    if (type === "IPCC") {
      setIpccSubjects(ipccSubjects.filter((_, i) => i !== index));
    } else if (type === "Theory") {
      setTheorySubjects(theorySubjects.filter((_, i) => i !== index));
    } else {
      setLabSubjects(labSubjects.filter((_, i) => i !== index));
    }
  };
  const token = localStorage.getItem("token");
  console.log(token)
 const handleGenerate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/timetable/generate", {
        method: "POST",
       headers: { 
  "Content-Type": "application/json", 
  "Authorization": `Bearer ${token}` 
},
        body: JSON.stringify({
          ipccSubjects: ipccSubjects,
          theorySubjects: theorySubjects,
          labSubjects: labSubjects,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate timetable");

      const data = await response.json();
      console.log("Received timetable:", data);

      setTimetable(data.timetable);
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("Failed to generate timetable.");
    }
  };

  const renderSubjectList = (subjects, typeName) => (
    <div>
      <h4>{typeName} Subjects</h4>
      {subjects.length === 0 && <p>No subjects added yet.</p>}
      <ul>
        {subjects.map((subj, index) => (
          <li key={index}>
            {subj.name} - {subj.credits} credit{subj.credits > 1 ? "s" : ""}
            <button
              onClick={() => handleRemove(typeName, index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h3>Add Subject</h3>
      <input
        placeholder="Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
      />
      <input
        type="number"
        value={credits}
        min={1}
        onChange={(e) => setCredits(parseInt(e.target.value) || 1)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>IPCC</option>
        <option>Theory</option>
        <option>Lab</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleGenerate}>Generate Timetable</button>

      <div style={{ marginTop: "20px" }}>
        {renderSubjectList(ipccSubjects, "IPCC")}
        {renderSubjectList(theorySubjects, "Theory")}
        {renderSubjectList(labSubjects, "Lab")}
      </div>
    </div>
  );
}

export default TimetableForm;
