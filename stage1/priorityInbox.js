const logger = require("../loggingMiddleware");

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getTopNotifications(data, n = 10) {
  logger("Starting priority calculation");

  logger("Sorting notifications");

  const result = data
    .sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);

  logger("Top notifications generated", result);

  return result;
}

// Sample data
const notifications = [
  {
    ID: "1",
    Type: "Result",
    Message: "project-review",
    Timestamp: "2026-04-22 17:50:42"
  },
  {
    ID: "2",
    Type: "Event",
    Message: "tech-fest",
    Timestamp: "2026-04-22 17:50:06"
  },
  {
    ID: "3",
    Type: "Placement",
    Message: "interview-call",
    Timestamp: "2026-04-22 17:51:00"
  }
];

const top = getTopNotifications(notifications);

console.log(top); // okay to show output