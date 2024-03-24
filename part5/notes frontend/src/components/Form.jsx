import { useState } from "react"

const LoginForm = ({ createLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        createLogin({
            username, password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type = "text"
            value = {username}
            name = "Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
            type = "password"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
        </form>
    )
}

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: true
        })
        setNewNote('')
    }
    
    return (
        <form onSubmit={addNote}>
        <input 
            value={newNote}
            onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
        </form>
    )
}

export { LoginForm, NoteForm }