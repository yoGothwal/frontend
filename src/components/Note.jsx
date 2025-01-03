import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Note = ({ note, toggleImportance, handleNoteDelete }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      <Link to={`/notes/${note._id}`}>{note.content}...</Link>
      <button onClick={() => toggleImportance(note._id)}>{label}</button>
      <button onClick={() => handleNoteDelete(note._id)}>Delete</button>
    </li>
  );
};

// Define prop types for Note
Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  }).isRequired,
  toggleImportance: PropTypes.func.isRequired,
  handleNoteDelete: PropTypes.func.isRequired,
};

export default Note;
