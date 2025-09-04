import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

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
app.patch("/notes/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read data" });

    let notes = JSON.parse(data);
    let note = notes.find(n => n.id == id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note = { ...note, ...updated };
    notes = notes.map(n => (n.id == id ? note : n));

    fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes), err => {
      if (err) return res.status(500).json({ error: "Failed to update data" });
      res.json(note);
    });
  });
});

// Optional: serve index.html if user visits root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
