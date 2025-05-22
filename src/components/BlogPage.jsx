import Blog from "./Blog.jsx";
import Togglable from "./Togglable.jsx";
import BlogForm from "./BlogForm.jsx";
import BlogContent from "./BlogContent.jsx";

import blogService from "../services/Blogs.jsx";
import { useState, useRef } from "react";

import { appendBlog } from "../reducers/blogSlice.js";
import { useDispatch } from "react-redux";
const BlogPage = ({ blogs, setBlogs }) => {
  const [sort, setSort] = useState(false);
  const blogToShow = sort
    ? [...blogs].sort((a, b) => b.likes - a.likes)
    : blogs;

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const blogFormRef = useRef();
  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(newBlog)
      .then((response) => {
        console.log("Blog added:", response.data);
        dispatch(appendBlog(response.data));
        setMessage(`Added "${newBlog.content}"`);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };

  const removeBlog = (id) => {
    console.log("removeUser", id);
    blogService
      .remove(id)
      .then(() => {
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        dispatch(setBlogs(updatedBlogs));
        setMessage("Deleted  Blogs");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to delete blog:", error);
      });
  };

  const content = (value) => {
    return (
      <Togglable buttonLabel="Show Blog">
        <BlogContent blogs={blogs} />
      </Togglable>
    );
  };
  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog._id === id);
    const newBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.update(id, newBlog);
      console.log("Updated blog:", response.data);
      const updatedBlogs = blogs.map((blog) =>
        blog._id === id ? response.data : blog
      );
      dispatch(setBlogs(updatedBlogs));
      setMessage("Liked");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Failed to update the blog:", error);
    }
  };
  const sortBlogsByLikes = () => {
    setSort(true);
  };
  return (
    <div className="parts">
      <h1>Blogs</h1>
      {message && <div className="error">{message}</div>}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <button onClick={() => setSort(!sort)}>
        {sort === false ? "sort" : "original"}
      </button>

      {blogToShow.map((blog) => (
        <div key={blog._id}>
          <Blog
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            content={content(blog.content)}
          ></Blog>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
