import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { LoginForm, NewBlogForm } from './components/Form'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

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

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      console.log('error:', exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLike = async (newLike, noteId) => {
    try {
      await blogService.update(newLike, noteId)

    } catch (error) {
      console.error(error)
      console.log('noteId from handlelike:', noteId)
      console.log('typeof noteId', typeof noteId)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>

      {
        user === null ? 
        <Togglable buttonLabel="login">
          <LoginForm createLogin={handleLogin} />
        </Togglable>
        :
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={() => {window.localStorage.removeItem('loggedNoteappUser'); setUser(null)}}>logout</button>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createBlog={handleSubmit} />
          </Togglable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} noteId={blog.id}/>)}
        </div>
      }

    </div>
  )
}

export default App