import { useState } from "react"
import "./Note.css"
export default function Note({ note, topic, important, deleteNote, toggleImp, editText}) {
    // console.log(topic)
    const [isEditing, setIsEditing] = useState(false)
    const [newValue, setIsNewValue] = useState(topic)

    const handleKey = (e) => {
        if(e.key === 'Enter'){
            setIsEditing(false)
            editText(note.id, newValue);
        }
    }

    const handleChange = (e) => {
        setIsNewValue(e.target.value);
        console.log(newValue)
    }

    return (
        <li className='list-item'>
            <span onClick={toggleImp} className="note-actions">
                <button>{important ? '⭐' : '〰️'}</button>
            </span>
            <span>

                {isEditing ?

                <input className="note-input"
                type="text"
                onChange={handleChange}
                value = {newValue}
                onKeyDown={handleKey}
                >
                </input> 
                : 
                <span onClick={() => setIsEditing(true)} className="note-content">{topic}</span>}
            
            </span>
            <span onClick={deleteNote} className="note-actions">
                <button>❎</button>
            </span>
        </li>
    )
}