import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id="title"
        />
      </div>
      <div>
        author:
        <input
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
        />
      </div>
      <div>
        url:
        <input
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id="url"
        />
      </div>
      <button id="save" type="submit">
        create
      </button>
    </form>
  )
}

export default NewBlogForm
