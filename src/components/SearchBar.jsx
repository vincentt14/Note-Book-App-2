import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

const SearchBar = ({ keyword, keywordChange }) => {
  const { locale } = React.useContext(LocaleContext);

  return <input type="text" placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by Title ..."} value={keyword} onChange={(event) => keywordChange(event.target.value)} />;
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
