import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Paths for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use process.cwd() to ensure correct path on Render
const dbPath = path.join(process.cwd(), "db.json");

// Serve React build files
app.use(express.static(path.join(__dirname, "dist")));

// ------------------ API ROUTES ------------------

// Get all notes
app.get("/notes", (req, res) => {
  console.log("GET /notes");
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read db.json:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});

// Get note by ID
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log("GET /notes/:id", id);
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    const notes = JSON.parse(data);
    const note = notes.find(n => n.id == id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  });
});

// Update note by ID
app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log("PATCH /notes/:id", id, updates);

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    let notes = JSON.parse(data);
    const noteIndex = notes.findIndex(n => n.id == id);
    if (noteIndex === -1) return res.status(404).json({ error: "Note not found" });

    notes[noteIndex] = { ...notes[noteIndex], ...updates };

    fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write data" });
      res.json(notes[noteIndex]);
    });
  });
});

// ------------------ React CATCH-ALL ------------------
// Must come after API routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
