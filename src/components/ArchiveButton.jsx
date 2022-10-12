import React from "react";
import { FiArchive } from "react-icons/fi";
import PropTypes from "prop-types";

const ArchiveButton = ({ onArchive, id }) => {
  return (
    <button
      type="button"
      className="action"
      title="archive"
      onClick={() => {
        onArchive(id);
      }}
    >
      <FiArchive />
    </button>
  );
};

ArchiveButton.propTypes = {
  onArchive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ArchiveButton;
