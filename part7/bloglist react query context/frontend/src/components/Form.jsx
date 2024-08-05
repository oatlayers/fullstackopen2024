import { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";

export const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    createLogin({
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <TextField
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        password
        <TextField
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          variant="outlined"
          size="small"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired,
};

export const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <TextField
          data-testid="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id="title"
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        author:
        <TextField
          data-testid="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
          variant="outlined"
          size="small"
        />
      </div>
      <div>
        url:
        <TextField
          data-testid="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id="url"
          variant="outlined"
          size="small"
        />
      </div>
      <Button variant="contained" color="primary" id="save" type="submit">
        create
      </Button>
    </form>
  );
};
