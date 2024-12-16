import { useState } from "react";
import PropTypes from "prop-types";
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() < 0.5,
    });
    setNewNote("");
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Write a note"
        />

        <button testid="save-button" type="submit">
          save
        </button>
      </form>
    </div>
  );
};
NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};
export default NoteForm;
