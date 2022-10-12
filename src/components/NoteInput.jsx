import React from "react";
import useInput from "../hooks/useInput";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";

const NoteInput = ({ addNote }) => {
  const [title, handleTitleChange] = useInput();
  const [body, setBody] = React.useState();

  const onBodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    addNote({
      title: title,
      body: body,
    });
  };

  return (
    <form className="add-new-page__input" onSubmit={submitHandler}>
      <input type="text" className="add-new-page__input__title" placeholder="Input Title" onChange={handleTitleChange} required/>
      <div className="add-new-page__input__body" data-placeholder="Notes..." contentEditable onInput={onBodyChange}></div>
      <div className="add-new-page__action">
        <button type="submit" title="done" className="action">
          <FiCheck />
        </button>
      </div>
    </form>
  );
};

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
