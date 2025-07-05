import React, { useState } from "react";
import TimetableForm from "../components/TimetableForm";
import TimetableDisplay from "../components/TimetableView";
import { useNavigate } from "react-router-dom";

function Dashboard({ token, setToken }) {
  const [timetable, setTimetable] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <TimetableForm setTimetable={setTimetable} token={token} />
      {timetable && <TimetableDisplay timetable={timetable} />}
    </div>
  );
}

export default Dashboard;
