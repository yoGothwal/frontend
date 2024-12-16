import { useParams } from "react-router-dom";

const NoteContent = ({ notes }) => {
  const { id } = useParams();
  const note = notes.find((n) => n._id === id);

  if (!note) {
    // Handle the case where the note isn't found
    return <div>Note not found or data is still loading.</div>;
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user?.username || "Unknown user"}</div>
      <div>
        <strong>{note.important ? "important" : "not important"}</strong>
      </div>
    </div>
  );
};

export default NoteContent;
