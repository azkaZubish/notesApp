import { useEffect, useState } from "react"
import axios, { all } from "axios";
import Note from "./Note";
import "./AllNotes.css"

export default function AllNotes() {
    const [allNotes, setAllNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [imp, setImp] = useState(false)

    useEffect(() => {
        async function fetchNotes() {
            try {
                const notes = await axios.get('http://localhost:3001/notes')
                setAllNotes(notes.data);
            }
            catch (e) {
                console.error('Fetching data failed')
            }
        }
        fetchNotes();
    }, [])

    async function addNote(e) {
        e.preventDefault();

        if (!newNote.trim()) return;

        const noteObject = {
            content: newNote,
            important: false
        }
        try {
            const res = await axios.post('http://localhost:3001/notes', noteObject)
            setAllNotes(prev => [...prev, res.data])
            setNewNote('')
        }
        catch (er) {
            console.error(er)
        }
    }

    const handleNoteChange = (e) => {
        setNewNote(e.target.value)
    }

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`)
            setAllNotes(prev => prev.filter(note => note.id !== id))
        }
        catch (err) {
            console.log(err)
        }
    }

    const toggleNote = async (id) => {
        

        const toBeUpdated = allNotes.find(note => note.id === id);
        const update = { important: !toBeUpdated.important }
        try {
            const res = await axios.patch(`http://localhost:3001/notes/${id}`, update)
           
            setAllNotes(prev => prev.map((note) => note.id === id ? res.data : note))
        }
        catch (err) {
            console.log(err);
        }

    }

    const editText = async (id, newValue) => {
        
        const update = { content: newValue }
        try {
            const res = await axios.patch(`http://localhost:3001/notes/${id}`, update)
            
            setAllNotes(prev => prev.map((note) => note.id === id ? res.data : note))
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleimpChange = (e) => {
        setImp(e.target.checked)
    }

    // console.log(allNotes.filter(note => note.important === true))
    return (
        <div>
            <div>
                <input type="checkbox" name="important" id="important" checked={imp} onChange={handleimpChange}/>
                <label htmlFor="important">Important notes</label>
            </div>

            <ul className="notes-container">
                {(imp ? allNotes.filter(note => note.important) : allNotes).map(note => {
                     return <Note key={note.id} note={note} topic={note.content} important={note.important} deleteNote={() => deleteNote(note.id)} toggleImp={() => toggleNote(note.id)} editText={editText} />
                })}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit" className="save-btn">save</button>
            </form>
        </div>
    )
}