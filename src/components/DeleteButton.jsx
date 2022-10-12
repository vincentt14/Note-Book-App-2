import React from "react";
import { FiTrash } from "react-icons/fi";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete, id }) => {
  return (
    <button
      type="button"
      className="action"
      title="delete"
      onClick={() => {
        onDelete(id);
      }}
    >
      <FiTrash />
    </button>
  );
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default DeleteButton;
