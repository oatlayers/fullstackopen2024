import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog, { BlogDetail } from "./components/Blog";
import Notification from "./components/Notification";
import { NewBlogForm, LoginForm } from "./components/Form";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import { UserDetailed } from "./components/Users";
import { useLogin } from "./context/LoginContext";
import { useBlogs } from "./hooks/useBlogs";
import { useUsers } from "./hooks/useUsers";
import { useLoginHandler } from "./hooks/useLogin";
import service from "./services/service";
import { Container, Button } from "@mui/material";

const App = () => {
  const blogFormRef = useRef();
  const { loginDispatch, user } = useLogin();
  const { users } = useUsers();
  const { handleLogin, handleLogout } = useLoginHandler(loginDispatch);

  const {
    blogs,
    isLoading,
    createBlogMutation,
    createCommentMutation,
    updateBlogMutation,
    removeBlogMutation,
  } = useBlogs();

  const handleRemove = async (id) => {
    try {
      const returnedBlog = await service.getId(id);
      if (
        window.confirm(
          `remove blog ${returnedBlog.title} by ${returnedBlog.author}?`
        )
      ) {
        removeBlogMutation.mutate(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (!users) {
    return <div>loading users...</div>;
  }

  const style = {
    padding: 5,
    backgroundColor: "lightblue",
  };

  return (
    <Container>
      <Router>
        {user === null ? (
          <>
            <h2>blog app</h2>
            <Notification />
            <Togglable buttonLabel="login">
              <LoginForm createLogin={handleLogin} />
            </Togglable>
          </>
        ) : (
          <>
            <div style={style}>
              <Link style={style} to="/">
                blogs
              </Link>
              <Link style={style} to="/users">
                users
              </Link>{" "}
              {user.name} logged in{" "}
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                logout
              </Button>
            </div>

            <Notification />
            <h2>blog app</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <NewBlogForm
                createBlog={(blogObject) => {
                  blogFormRef.current.toggleVisibility();
                  createBlogMutation.mutate(blogObject);
                }}
              />
            </Togglable>

            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    {blogs.map((blog) => (
                      <Blog key={blog.id} blog={blog} />
                    ))}
                  </div>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <BlogDetail
                    blogs={blogs}
                    handleLike={(id, newLike) =>
                      updateBlogMutation.mutate({ id, newLike })
                    }
                    commentMutate={createCommentMutation}
                    handleRemove={handleRemove}
                    user={user ? user.name : ""}
                  />
                }
              />
              <Route
                path="/user/:id"
                element={<UserDetailed blogs={blogs} users={users} />}
              />
              <Route path="/users" element={<Users users={users} />} />
            </Routes>
          </>
        )}
      </Router>
    </Container>
  );
};

export default App;
