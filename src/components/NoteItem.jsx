import React from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";

const NoteItem = ({ id, title, body, createdAt }) => {
  return (
    <article className="note-item">
      <h3 className="note-item-title">
        <Link to={`/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{createdAt}</p>
      <div className="note-item__body">{parser(body)}</div>
    </article>
  );
};

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
