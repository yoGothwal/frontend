import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
const BlogContent = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog._id === id);
  if (!blog) {
    // Handle the case where the note isn't found
    return <div>Note not found or data is still loading.</div>;
  }
  console.log("all blogs:", blogs);
  return (
    <div>
      <h3>
        <strong>{blog.title}</strong>
      </h3>
      <p>Content: {blog.content}</p>
      <p>
        Likes: <strong>{blog.likes}</strong>
      </p>
      <h5>Author: {blog.author}</h5>
    </div>
  );
};
BlogContent.propTypes = {
  blogs: PropTypes.array.isRequired,
};
export default BlogContent;
