import "./Note.css"
export default function Note({ topic, important, deleteNote, toggleImp}) {
    console.log(topic)
    return (
        <li className='Note'>
            <span onClick={toggleImp}>{important ? `⭐ ${topic}` : topic}</span>
            <span onClick={deleteNote} className="note-item">❎</span>
        </li>
    )
}