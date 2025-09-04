const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://notesapp-j5uy.onrender.com";

export default API_URL;