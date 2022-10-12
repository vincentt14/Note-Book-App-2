import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from "../utils/api";
import NoteList from "../components/NoteList";
import AddButton from "../components/AddButton";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    async function fetchNotesData() {
      const { error, data } = await getActiveNotes();
      !error && setNotes(data);
    }
    fetchNotesData();
  }, []);

  function onKeywordChangedHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <>
      <section className="homepage">
        <section className="search-bar">
          <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
          <SearchBar keyword={keyword} keywordChange={onKeywordChangedHandler} />
        </section>
        <NoteList notes={filteredNotes} />
      </section>
      <section className="homepage__action">
        <AddButton />
      </section>
    </>
  );
};

export default HomePage;
