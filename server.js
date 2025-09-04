import cors from "cors";
import express from "express";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Serve React build
app.use(express.static(path.join(__dirname, "dist")));

// Allow frontend requests
app.use(
  cors({
    origin: "*", // change later if you want only your frontend
  })
);

// Start JSON Server as a child process
const jsonServerProcess = spawn("npx", [
  "json-server",
  "--watch",
  "db.json",
  "--port",
  "3001", // keep backend on 3001
]);

jsonServerProcess.stdout.on("data", (data) => {
  console.log(`JSON Server: ${data}`);
});

jsonServerProcess.stderr.on("data", (data) => {
  console.error(`JSON Server error: ${data}`);
});

// Start express
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
