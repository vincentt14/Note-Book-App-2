import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/api";
import NoteInput from "../components/NoteInput";

const AddNotePage = () => {
  const navigate = useNavigate();

  const addNoteHandler = (note) => {
    addNote(note);
    navigate("/");
  };

  return (
    <section className="add-new-page">
      <NoteInput addNote={addNoteHandler} />
    </section>
  );
};

export default AddNotePage;
