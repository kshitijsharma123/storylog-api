import fs from "fs";
import path from "path";

const logFilePath = path.resolve("write-requests.log");

const logWrites = (req, res, next) => {
  const method = req.method;

  if (["POST", "PUT", "DELETE"].includes(method)) {
    const timestamp = new Date().toISOString();
    const logEntry = `
[${timestamp}] ${method} ${req.originalUrl}
Body: ${JSON.stringify(req.body)}
User: ${req.user ? JSON.stringify(req.user) : "Unauthenticated"}
-------------------------\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) console.error("Failed to write log:", err.message);
    });
  }

  next();
};

export default logWrites;
