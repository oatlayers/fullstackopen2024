import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

export const BlogDetail = ({
  blogs,
  handleLike,
  commentMutate,
  handleRemove,
  user,
}) => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const addLike = () => {
    const newLike = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };
    handleLike(id, newLike);
  };

  const toggleRemove = () => {
    if (blog.user.name === user) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRemove(id)}
        >
          remove
        </Button>
      );
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const blogId = blog.id;
    commentMutate.mutate({ comment: comment, id: blogId });
    setComment("");
  };

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes}
        <Button variant="contained" color="primary" onClick={addLike}>
          like
        </Button>
      </div>
      <div>added by {user}</div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <TextField
          type="text"
          name="Comment"
          placeholder="type something..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
      {toggleRemove()}
    </>
  );
};

export default Blog;
