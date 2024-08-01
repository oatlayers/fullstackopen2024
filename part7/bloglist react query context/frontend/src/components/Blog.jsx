import { Link, useParams } from "react-router-dom";

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

export const BlogDetail = ({ blogs, handleLike, handleRemove, user }) => {
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
      return <button onClick={() => handleRemove(id)}>remove</button>;
    }
  };

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>added by {user}</div>
      {toggleRemove()}
    </>
  );
};

export default Blog;
