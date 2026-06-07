import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const mockData = [
      { ID: "1", Type: "Placement", Message: "interview-call", Timestamp: "2026-04-22 17:51:00" },
      { ID: "2", Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:42" },
      { ID: "3", Type: "Event", Message: "tech-fest", Timestamp: "2026-04-22 17:50:06" }
    ];

    setNotifications(mockData);
  }, []);

  const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  const getScore = (n) => {
    const weight = priorityMap[n.Type];
    const time = new Date(n.Timestamp).getTime();
    return weight * 1000000000000 + time;
  };

  const priorityNotifications = [...notifications]
    .sort((a, b) => getScore(b) - getScore(a))
    .slice(0, 10);

  return (
    <Router>
      <div>
        <h1>Campus Notifications</h1>

        {/* Navigation */}
        <nav>
          <Link to="/">All</Link> | <Link to="/priority">Priority</Link>
        </nav>

        <Routes>
          {/* All Notifications Page */}
          <Route
            path="/"
            element={
              <div>
                <h2>All Notifications</h2>

                <div>
                  <button onClick={() => setFilter("All")}>All</button>
                  <button onClick={() => setFilter("Placement")}>Placement</button>
                  <button onClick={() => setFilter("Result")}>Result</button>
                  <button onClick={() => setFilter("Event")}>Event</button>
                </div>

                {notifications
                  .filter(n => filter === "All" || n.Type === filter)
                  .map((n) => (
                    <div key={n.ID} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                      <p><b>Type:</b> {n.Type}</p>
                      <p><b>Message:</b> {n.Message}</p>
                      <p><b>Time:</b> {n.Timestamp}</p>
                    </div>
                  ))}
              </div>
            }
          />

          {/* Priority Page */}
          <Route
            path="/priority"
            element={
              <div>
                <h2>🔥 Priority Notifications</h2>

                {priorityNotifications.map((n) => (
                  <div key={n.ID} style={{ border: "2px solid red", margin: "10px", padding: "10px" }}>
                    <p><b>Type:</b> {n.Type}</p>
                    <p><b>Message:</b> {n.Message}</p>
                    <p><b>Time:</b> {n.Timestamp}</p>
                  </div>
                ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;