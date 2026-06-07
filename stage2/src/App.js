import React, { useEffect, useState } from "react";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ✅ Mock data (from API sample)
    const mockData = [
      {
        ID: "1",
        Type: "Placement",
        Message: "interview-call",
        Timestamp: "2026-04-22 17:51:00",
      },
      {
        ID: "2",
        Type: "Result",
        Message: "project-review",
        Timestamp: "2026-04-22 17:50:42",
      },
      {
        ID: "3",
        Type: "Event",
        Message: "tech-fest",
        Timestamp: "2026-04-22 17:50:06",
      }
    ];

    setNotifications(mockData);
  }, []);

  return (
    <div>
      <h1>Campus Notifications</h1>

      {notifications.map((n) => (
        <div key={n.ID} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>Type:</b> {n.Type}</p>
          <p><b>Message:</b> {n.Message}</p>
          <p><b>Time:</b> {n.Timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;