import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    createLogin({
      username, password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
            username
        <input
          type = "text"
          value = {username}
          name = "Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
            password
        <input
          type = "password"
          value = {password}
          name = "Password"
          onChange = {({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired
}

export { LoginForm }