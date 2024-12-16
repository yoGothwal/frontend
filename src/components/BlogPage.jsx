import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogContent from "./BlogContent";

import blogService from "../services/Blogs";
import { useState, useEffect, useRef } from "react";

const BlogPage = ({ blogs, setBlogs }) => {
  const [message, setMessage] = useState("");
  const blogFormRef = useRef();

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    console.log("Adding blog:", newBlog);

    blogService
      .create(newBlog)
      .then((response) => {
        console.log("Blog added:", response.data);
        setBlogs((prevBlogs) => prevBlogs.concat(response.data)); // Update blogs list
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
      .then((res) => {
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
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
      setBlogs(updatedBlogs);
      setMessage("Liked");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Failed to update the blog:", error);
    }
  };
  const sortBlogsByLikes = () => {
    const newBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    console.log("clicked");
    console.log(newBlogs);
    setBlogs(newBlogs);
  };
  return (
    <div className="parts">
      <h1>Blogs</h1>
      {message && <div className="error">{message}</div>}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <button onClick={() => sortBlogsByLikes(blogs)}>sort</button>
      <ul>
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Blog
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              content={content(blog.content)}
            ></Blog>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
