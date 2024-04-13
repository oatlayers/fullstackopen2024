import { useState } from 'react'

const Blog = ({ blog, handleLike, id, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
        <button id='show-button' onClick={toggleVisibility}>
          view
        </button>
      </div>

      <div id='content' style={showWhenVisible}>
        <div id='title'>{blog.title}
          <button id='hide-button' onClick={toggleVisibility}>
          hide
          </button>
        </div>
        <a id='url' href={blog.url}>{blog.url}</a>
        <div id='likes'>{blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div id='author'>{blog.author}</div>
        {toggleRemove()}
      </div>
    </div>
  )
}

export default Blog