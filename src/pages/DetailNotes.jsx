import { BiArchiveIn } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/local-data";
import { Page404 } from './404Page';

export const DetailNotes = () => {
    const params = useParams();
    const location = useLocation();

    let note = getNote(params?.id)

    const handleArchiveOrNotArchive = (noteId) => {
        if(location.pathname.includes('archive')) {
            unarchiveNote(noteId)
        }else {
            archiveNote(noteId)
        }
        window.history.back("/notes");
    }

     const handleDelete = (noteId) => {
        deleteNote(noteId)
        window.history.back("/notes");
    }

    return (
        note ? 
                <>
                    <div className="note-item detail">
                            <h3 className="note-item__title">{note.title}</h3>
                            <span className="note-item__createdAt">{showFormattedDate(note.createdAt)}</span>
                            <p className="note-item__body">{note.body}</p>

                        <div className="actions">
                                <div className="archive">
                                    {
                                        location.pathname.includes('archive') ? 
                                        <MdOutlineUnarchive onClick={() => handleArchiveOrNotArchive(note.id)} size={20} /> :
                                        <BiArchiveIn onClick={() => handleArchiveOrNotArchive(note.id)} size={20} />
                                    }
                                </div>

                                <div className="delete" >
                                    <FaTrash onClick={() => handleDelete(note.id)} />
                                </div>
                        </div>
                        </div>
                </>
            :
                <>
                   <Page404 />
                </>
    )
}