import React from "react";
import { FiBookOpen } from "react-icons/fi";
import PropTypes from "prop-types";

const UnarchiveButton = ({ onUnarchive, id }) => {
  return (
    <button
      type="button"
      className="action"
      title="unarchive"
      onClick={() => {
        onUnarchive(id);
      }}
    >
      <FiBookOpen />
    </button>
  );
};

UnarchiveButton.propTypes = {
  onUnarchive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default UnarchiveButton;
