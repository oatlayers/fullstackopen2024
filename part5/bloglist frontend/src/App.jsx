import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import {LoginForm, NewBlogForm} from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Notification message={errorMessage}/>

      {
        user === null ? 
        <LoginForm 
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        />
        :
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={() => {window.localStorage.removeItem('loggedNoteappUser'); setUser(null)}}>logout</button>
 
          <NewBlogForm 
          handleSubmit={handleSubmit}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          title={title}
          author={author}
          url={url}
          />
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }

    </div>
  )
}

export default App