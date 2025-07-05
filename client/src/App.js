import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TimetableForm from "./components/TimetableForm";
import TimetableDisplay from './components/TimetableDisplay';

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [timetable, setTimetable] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="App">
      <h1>University Timetable Generator</h1>

      {!user ? (
        <div>
          {showRegister ? (
            <>
              <Register setUser={setUser} /> {/* pass setUser */}
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowRegister(false)}>Login here</button>
              </p>
            </>
          ) : (
            <>
              <Login setUser={setUser} />
              <p>
                New user?{" "}
                <button onClick={() => setShowRegister(true)}>Register here</button>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <TimetableForm setTimetable={setTimetable} />
          {timetable && <TimetableDisplay timetable={timetable} />}
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
