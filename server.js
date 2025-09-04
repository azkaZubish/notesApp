import cors from 'cors'
const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 10000;

// Serve React build
app.use(express.static(path.join(__dirname, "dist")));

// Start JSON Server as a child process
const jsonServer = spawn("npx", [
  "json-server",
  "--watch",
  "db.json",
  "--port",
  PORT,
  "--routes",
]);

jsonServer.stdout.on("data", (data) => {
  console.log(`JSON Server: ${data}`);
});

jsonServer.stderr.on("data", (data) => {
  console.error(`JSON Server error: ${data}`);
});

// Start express
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: "http://localhost:5173"   
}));
