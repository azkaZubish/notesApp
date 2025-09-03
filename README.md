📝#Notes Taking App

A simple and elegant notes taking application built with React. Users can add, edit, delete, and mark notes as important. Notes are stored on a JSON server, making it lightweight and perfect for learning full-stack concepts.

#Features
➕ Add new notes
🖊️ Edit existing notes
🗑️ Delete notes
⭐ Mark notes as important
🔄 Filter between All Notes and Important Notes
🎨 Clean UI with responsive design

🛠️ #Tech Stack
-Frontend: React (with hooks & functional components)
-Styling: CSS (custom, with modern UI design)
-Backend: JSON Server (for storing notes in db.json)

⚙️ Installation & Setup

-Clone the repo
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

-Install dependencies
```bash
npm install
```

-Run JSON server (default port: 3001)
```bash
npx json-server --watch db.json --port 3001
```

-Start the React app
```bash
npm run dev
```

📌 #Future Improvements

🔍 Search notes
📅 Add timestamps
🏷️ Categories/Tags
☁️ Real backend (Express / MongoDB / Firebase)