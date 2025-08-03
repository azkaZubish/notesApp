import { useState } from "react"
import "./Note.css"
export default function Note({ note, topic, important, deleteNote, toggleImp, editText}) {
    console.log(topic)
    const [isEditing, setIsEditing] = useState(false)
    const [newValue, setIsNewValue] = useState(topic)

    const handleKey = (e) => {
        if(e.key === 'Enter'){
            setIsEditing(false)
        }
    }

    const handleChange = (e) => {
        setIsNewValue(e.target.value);
        editText(note.id, newValue);
    }

    return (
        <li className='list-item'>
            <span onClick={toggleImp} className="important">{important ? '⭐' : '〰️'}</span>
            <span>

                {isEditing ?

                <input
                type="text"
                onChange={handleChange}
                value = {newValue}
                onKeyDown={handleKey}
                >
                </input> 
                : 
                <span onDoubleClick={() => setIsEditing(true)}>{topic}</span>}
            
            </span>
            <span onClick={deleteNote} className="note-item">❎</span>
        </li>
    )
}