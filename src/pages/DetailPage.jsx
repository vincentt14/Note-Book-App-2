import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveButton from "../components/ArchiveButton";
import UnarchiveButton from "../components/UnarchivedButton";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import DeleteButton from "../components/DeleteButton";
import NoteDetail from "../components/NoteDetail";
import { PropTypes } from 'prop-types';

const DetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getNoteId() {
      const { error, data } = await getNote(id);
      !error && setNote(data);
    }
    getNoteId();
  }, []);

  const onDeleteEventHandler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      navigate("/");
    }
  };

  const onArchiveEventHandler = async (id) => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate("/archive");
    }
  };

  const onUnarchiveEventHandler = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate("/");
    }
  };

  if (note !== undefined) {
    return (
      <section className="detail-page">
        <NoteDetail {...note} />
        <div className="detail-page__action">
          {note.archived ? <UnarchiveButton id={id} onUnarchive={onUnarchiveEventHandler} /> : <ArchiveButton id={id} onArchive={onArchiveEventHandler} />}
          <DeleteButton id={id} onDelete={onDeleteEventHandler} />
        </div>
      </section>
    );
  }
};

DetailPage.propTypes = {
  id: PropTypes.string,
}

export default DetailPage;
