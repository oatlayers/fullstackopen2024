import { useEffect, useState } from 'react'

const Blog = ({ blog, handleLike, id, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : 'block' }
  const showWhenVisible = { display: visible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    const newLike = {
      ...blog,
      likes: blog.likes + 1,
    }
    handleLike(id, newLike)
  }

  const renderRemoveButton = () => {
    return blog.user.name === user ? (
      <button onClick={() => handleRemove(id)}>remove</button>
    ) : null
  }

  return (
    <div style={blogStyle}>
      <div id="title-author" style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button id="view-button" onClick={toggleVisibility}>
          view
        </button>
      </div>

      <div id="content" style={showWhenVisible}>
        <div data-testid="blog-title" id="title">
          {blog.title}
          <button id="hide-button" onClick={toggleVisibility}>
            hide
          </button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div id="likes">
          {blog.likes}
          <button data-testid="likes" id="likes-button" onClick={addLike}>
            like
          </button>
        </div>
        <div data-testid="blog-author">{blog.author}</div>
        {renderRemoveButton()}
      </div>
    </div>
  )
}

export default Blog
