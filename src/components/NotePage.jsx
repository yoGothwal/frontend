import React, { useState, useRef } from "react";
import NoteForm from "./NoteForm";
import Note from "./Note";
import Togglable from "./Togglable";
import noteService from "../services/Notes";
const NotePage = ({ notes, setNotes }) => {
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("");
  const noteFormRef = useRef();

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    if (!noteObject.content || noteObject.content.trim().length < 3) {
      setMessage("Note must be at least 3 characters long.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    noteService
      .create(noteObject)
      .then((response) => {
        setNotes(notes.concat(response.data));

        console.log("Note added:", response.data);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setMessage("Error adding note: " + error.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const toggleImportanceOfNote = (id) => {
    const note = notes.find((n) => n._id === id);
    console.log("note to be changed", note);
    if (!note) return;
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n._id === id ? response.data : n)));
      })
      .catch((error) => {
        console.error("Error toggling importance:", error.message);
        setNotes(notes.filter((n) => n._id !== id));
      });
  };

  const handleNoteDelete = (id) => {
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        setMessage("Note deleted successfully.");
      })
      .catch((error) => {
        console.error("Failed to delete note:", error.message);
      });
  };

  return (
    <div className="parts">
      <h1>Notes</h1>

      {message && <div className="error">{message}</div>}
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"}
      </button>
      {notesToShow.map((note) => (
        <Note
          key={note._id}
          note={note}
          handleNoteDelete={handleNoteDelete}
          toggleImportance={toggleImportanceOfNote}
        />
      ))}
    </div>
  );
};

export default NotePage;
