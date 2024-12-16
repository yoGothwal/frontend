import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
    url: "",
  });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value, // Dynamically update the specific field
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      content: "",
      url: "",
    });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          name="title" // Input name matches the field in the state
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="Write title"
        />
        <input
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="Write author name"
        />
        <input
          name="content"
          value={newBlog.content}
          onChange={handleBlogChange}
          placeholder="Write content"
        />
        <input
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="Write url"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

// Define prop types for BlogForm
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
