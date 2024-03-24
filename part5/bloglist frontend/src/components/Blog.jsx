import { useState } from "react"

const Blog = ({ blog, handleLike, noteId }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => { setVisible(!visible) }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    const newLike = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    console.log('value of blog', blog)
    console.log('value of newLike:', newLike)
    console.log('typeof noteId', typeof noteId)
    console.log('value of noteId', noteId)
    handleLike(newLike, noteId)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes} <button onClick={addLike}>like</button> <br/>
        {blog.author} <br/>  
      </div>
    </div>
  )
}

export default Blog