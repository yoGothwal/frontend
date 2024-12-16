import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
const BlogContent = ({ blogs }) => {
  const { id } = useParams();
  console.log(id);
  const blog = blogs.find((blog) => blog._id === id);

  console.log(blog);
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
