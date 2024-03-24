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
        <h2>log in to application</h2>
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

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>title: 
            <input 
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>author: 
            <input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>url: 
            <input 
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export {LoginForm, NewBlogForm}