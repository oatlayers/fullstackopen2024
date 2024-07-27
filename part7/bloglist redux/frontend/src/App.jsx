import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm, NewBlogForm } from './components/Form'
import Togglable from './components/Togglable'

import service from './services/service'
import { changeNotification } from './reducers/notificationSlice'
import {
  createBlog,
  fetchBlogs,
  updateBlog,
  removeBlog,
} from './reducers/blogSlice'
import { setUser, removeUser } from './reducers/userSlice'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  // initial fetch and sort of all blogs
  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  // prevent reload from logging out
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      service.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (loginObject) => {
    try {
      const user = await service.login(loginObject)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      service.setToken(user.token)
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
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          5
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleLike = async (id, newLike) => {
    try {
      const returnedBlog = await service.update(id, newLike)
      dispatch(updateBlog(returnedBlog))
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
        dispatch(removeBlog(id))
        await service.remove(id)
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
              dispatch(removeUser())
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
