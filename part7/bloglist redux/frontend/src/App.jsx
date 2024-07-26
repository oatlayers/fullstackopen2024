import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm, NewBlogForm } from './components/Form'
import Togglable from './components/Togglable'

import service from './services/service'
import { changeNotification } from './reducers/notificationSlice'
import { createBlog, fetchBlogs } from './reducers/blogSlice'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  // initial fetch and sort of all blogs
  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  // prevent logout when reload
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      service.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await service.login(loginObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      service.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(changeNotification('Wrong credentials', 5))
    }
  }

  const handleSubmit = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await service.create(blogObject)
      dispatch(createBlog(returnedBlog))
      dispatch(
        changeNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleLike = async (id, newLike) => {
    try {
      const returnedBlog = await service.update(id, newLike)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? returnedBlog : blog))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async (id) => {
    try {
      const returnedBlog = await service.getId(id)
      if (
        window.confirm(
          `Remove blog ${returnedBlog.title} by ${returnedBlog.author}?`
        )
      ) {
        await service.remove(id)
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm createLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              setUser(null)
            }}
          >
            logout
          </button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createBlog={handleSubmit} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              id={blog.id}
              handleRemove={handleRemove}
              user={user.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
