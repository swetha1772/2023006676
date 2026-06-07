const logger = require("../loggingMiddleware");
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwc3dldGhhQGdpdGFtLmluIiwiZXhwIjoxNzgwODEyNDEwLCJpYXQiOjE3ODA4MTE1MTAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyNGEyZWRhOS02NmQ0LTRhZTItYmM3Ni1hNTU1OTRlZGRhN2MiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwYWxlcHUgc3dldGhhIiwic3ViIjoiYzhhYTM5OWQtODg1ZS00MjM0LThiZGQtMDI4YTRiMzgxMTU4In0sImVtYWlsIjoicHN3ZXRoYUBnaXRhbS5pbiIsIm5hbWUiOiJwYWxlcHUgc3dldGhhIiwicm9sbE5vIjoiMjAyMzAwNjY3NiIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6ImM4YWEzOTlkLTg4NWUtNDIzNC04YmRkLTAyOGE0YjM4MTE1OCIsImNsaWVudFNlY3JldCI6IktHWWRIbkd2emdYdlpCY3gifQ.6DlRWELHMdeRiEinyFVvTVwQ3V9HRIQh7GMa8IsWcZc";


const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getScore(notification) {
  const weight = priorityMap[notification.Type];
  const time = new Date(notification.Timestamp).getTime();

  return weight * 1000000000000 + time;
}

// Fetch notifications from API
async function fetchNotifications() {
  logger("Fetching notifications from API");

  try {
    const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
      method: "GET",
      headers: {
        "Authorization":'Bearer ${TOKEN}'
      }
    });

    if (!response.ok) {
      logger("API error", response.status);
      return [];
    }

    const data = await response.json();

    logger("API response received");

    return data.notifications || [];
  } catch (error) {
    logger("Error fetching notifications", error);
    return [];
  }
}

function getTopNotifications(data, n = 10) {
  logger("Starting priority calculation");

  const result = data
    .sort((a, b) => getScore(b) - getScore(a))
    .slice(0, n);

  logger("Top notifications generated", JSON.stringify(result, null, 2));

  return result;
}

// Main function
async function main() {
  const notifications = await fetchNotifications();

  if (notifications.length === 0) {
    logger("No notifications found");
    return;
  }

  const top = getTopNotifications(notifications);

  console.log("\nTop Notifications:\n");
  console.log(top);
}

main();