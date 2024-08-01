import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const blogFormRef = useRef();
  const { loginDispatch, user } = useLogin();
  const { users } = useUsers();
  const { handleLogin, handleLogout } = useLoginHandler(loginDispatch);

  const {
    blogs,
    isLoading,
    createBlogMutation,
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

  return (
    <Router>
      <div>
        <h1>Blogs</h1>
        <Notification />

        {user === null ? (
          <Togglable buttonLabel="login">
            <LoginForm createLogin={handleLogin} />
          </Togglable>
        ) : (
          <>
            <h2>blogs</h2>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
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
                    handleRemove={handleRemove}
                    user={user ? user.name : ""}
                  />
                }
              />
              <Route
                path="/user/:id"
                element={<UserDetailed blogs={blogs} users={users} />}
              />
            </Routes>
            <Users users={users} />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
