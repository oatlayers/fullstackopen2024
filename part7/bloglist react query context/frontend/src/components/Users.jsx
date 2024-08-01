import { Link, useParams } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const UserDetailed = ({ blogs, users }) => {
  // extract id of "/user/:id"
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  const userBlogs = blogs.filter((blog) => blog.user.id === id);

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
