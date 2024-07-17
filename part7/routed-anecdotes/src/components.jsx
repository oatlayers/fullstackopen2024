import { Link, useNavigate } from "react-router-dom"
import { useField } from './hooks'

export const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
      </ul>
    </div>
  )

export const About = () => (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
  
      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>
  
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  )
  
export const Footer = () => (
    <div>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
  
      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )

export const CreateNew = ({ addNew }) => {
  const { reset: resetContent, ...content} = useField('text')
  const { reset: resetAuthor, ...author} = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/anecdotes')
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="myform" onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <input type="button" onClick={handleReset} value="reset"/>
      </form>
    </div>
  )
}
