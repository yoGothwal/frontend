const Note = ({note, toggleImportance, handleNoteDelete})=>{
    const label = note.important ? 'make not important' : 'make important'
    return(
      <div>
        <h5>{note.content}</h5>
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={handleNoteDelete}>Delete</button>
      </div>
    )
  }
  export default Note;