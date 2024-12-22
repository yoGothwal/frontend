import { useState } from "react";
import PropTypes from "prop-types";
import { useField } from "./CustonHooks.jsx";
const NoteForm = ({ createNote }) => {
  const newNote = useField("");
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote.value,
      important: Math.random() < 0.5,
    });
    newNote.reset();
    // setNewNote("");
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote.value}
          type={newNote.type}
          onChange={newNote.onChange}
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
