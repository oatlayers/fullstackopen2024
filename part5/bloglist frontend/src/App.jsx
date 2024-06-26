import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  // i set it to sort the array only when reload since
  // the exercise doesnt specify i had to do it once button is clicked
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)}
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLike = async (id, newLike) => {
    try {
      const returnedBlog = await blogService.update(id, newLike)
      // state of blogs needs to be updated, otherwise it won't render like changes
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === id ? returnedBlog : blog
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async (id) => {
    try {
      const returnedBlog = await blogService.getId(id)
      if (window.confirm(`Remove blog ${returnedBlog.title} by ${returnedBlog.author}?`)) {
        await blogService.remove(id)
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>

      {user === null ?
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

          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} id={blog.id} handleRemove={handleRemove} user={user.name}/>)}
        </div>}
    </div>
  )
}

export default App