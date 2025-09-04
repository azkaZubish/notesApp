import cors from "cors";
import express from "express";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());

// Serve React build
app.use(express.static(path.join(__dirname, "dist")));

// JSON Server router (on /api)
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

// React catch-all (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start express
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
