import "./Note.css"
export default function Note({ topic, important }) {
    console.log(topic)
    return (
        <li className='Note'>
            {important ? `⭐ ${topic}` : topic}
            <span>❎</span>
        </li>
    )
}