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
            <span onClick={toggleImp} className="note-action note-star">
                {important ? '⭐' : ''}
            </span>
            <div className="note-main">

                {isEditing ?

                <input className="note-input"
                type="text"
                onChange={handleChange}
                value = {newValue}
                onKeyDown={handleKey}
                >
                </input> 
                : 
                <span className="note-content">{topic}</span>}
            
            </div>
            <span onClick={() => setIsEditing(true)} className="note-action note-edit">✏️</span>
            <span onClick={deleteNote} className="note-action note-delete"> 🗑 </span>
        </li>
    )
}