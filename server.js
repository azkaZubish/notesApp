import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build files
app.use(express.static(path.join(__dirname, "dist")));

app.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    res.json(JSON.parse(data));
  });
});
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });
    const notes = JSON.parse(data);
    const note = notes.find(n => n.id == id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  });
});

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    let notes = JSON.parse(data);
    const noteIndex = notes.findIndex(n => n.id == id);
    if (noteIndex === -1) return res.status(404).json({ error: "Note not found" });

    notes[noteIndex] = { ...notes[noteIndex], ...updates };

    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), err => {
      if (err) return res.status(500).json({ error: "Failed to write data" });
      res.json(notes[noteIndex]);
    });
  });
});


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
