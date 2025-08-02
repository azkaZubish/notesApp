import { useEffect, useState } from "react"
import axios, { all } from "axios";
import Note from "./Note";

export default function AllNotes() {
    const [allNotes, setAllNotes] = useState([]);
    const [newNote, setNewNote] = useState("");

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

    console.log(allNotes);
    return (
        <div>
            
                <ul>
                {allNotes.map((note, idx) => {
                    return <Note key={idx} topic={note.content} important = {note.important} />
                })}
                </ul>
            
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}