import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import service from './services/service'
import Notification from './components/Notification'
import { NewBlogForm, LoginForm } from './components/Form'
import Togglable from './components/Togglable'
import { useNotification } from './context/NotificationContext'
import { useLogin } from './context/LoginContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {
  const blogFormRef = useRef()
  const { dispatch } = useNotification()
  const { loginDispatch, user } = useLogin()
  const queryClient = useQueryClient()

  const getAndSort = async () => {
    const res = await service.getAll()
    return res.sort((a, b) => b.likes - a.likes)
  }

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAndSort,
  })

  const createBlogMutation = useMutation({
    mutationFn: (blogObject) => service.create(blogObject),
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(['blogs'])
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: (updateData) =>
      service.update(updateData.id, updateData.newLike),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: (id) => service.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  // prevent reloading from logging out user
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      loginDispatch({ type: 'SET_USER', payload: user })
      service.setToken(user.token)
    }
  }, [loginDispatch])

  const handleLogin = async (loginObject) => {
    try {
      const user = await service.login(loginObject)
      loginDispatch({ type: 'SET_USER', payload: user })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      service.setToken(user.token)
    } catch (exception) {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Wrong credentials' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleSubmit = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    createBlogMutation.mutate(blogObject)
  }

  const handleLike = async (id, newLike) => {
    updateBlogMutation.mutate({ id, newLike })
  }

  const handleRemove = async (id) => {
    try {
      const returnedBlog = await service.getId(id)
      if (
        window.confirm(
          `Remove blog ${returnedBlog.title} by ${returnedBlog.author}?`
        )
      ) {
        removeBlogMutation.mutate(id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <div>loading data...</div>
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
              window.localStorage.removeItem('loggedNoteappUser')
              loginDispatch({ type: 'SET_USER', payload: null })
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
