import { Link } from "react-router-dom";
const Blog = ({ blog, likeBlog, removeBlog }) => {
  return (
    <li key={blog._id}>
      <h3>Title: {blog.title}</h3>
      <h5>likes: {blog.likes}</h5>
      <Link to={`/blogs/${blog._id}`}>{blog.content}...</Link>
      <button onClick={() => likeBlog(blog._id)}>Like</button>
      <button onClick={() => removeBlog(blog._id)}>Delete</button>
    </li>
  );
};
export default Blog;
