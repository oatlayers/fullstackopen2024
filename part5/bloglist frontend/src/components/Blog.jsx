import { useState } from 'react'

const Blog = ({ blog, handleLike, id, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : 'block' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => { setVisible(!visible) }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const newLike = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    handleLike(id, newLike)
  }

  const toggleRemove = () => {
    if (blog.user.name === user) {
      return (
        <button onClick={() => handleRemove(id)}>remove</button>
      )
    }
  }

  return (
    <div style={blogStyle}>

      <div id='title-author' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button id='view-button' onClick={toggleVisibility}>
          view
        </button>
      </div>

      <div id='content' style={showWhenVisible}>
        <div data-testid='blog-title' id='title'>{blog.title}
          <button id='hide-button' onClick={toggleVisibility}>
          hide
          </button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div id='likes'>{blog.likes}
          <button id='likes-button' onClick={addLike}>like</button>
        </div>
        <div data-testid='blog-author'>{blog.author}</div>
        {toggleRemove()}
      </div>

    </div>
  )
}

export default Blog