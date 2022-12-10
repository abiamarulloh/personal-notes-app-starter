import { useEffect, useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/atoms/Loading";
import { showFormattedDate } from "../utils";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { Page404 } from './404Page';

export const DetailNotes = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [spinner, setSpinner] = useState(true)
            
    const currentArchivePage = location.pathname.includes('archive')

    useEffect(() => {
        getNote(params.id).then(({data}) => {
            setNote(data)
            setSpinner(false)
        }, () => {
            setSpinner(false)
        })
    }, [params.id])

    const handleArchiveOrNotArchive = (noteId) => {
        if(currentArchivePage) {
            unarchiveNote(noteId)
            navigate("/notes/archive");
        }else {
            archiveNote(noteId)
            navigate("/notes");
        }
    }

    const handleDelete = (noteId) => {
        if(currentArchivePage) {
            navigate("/notes/archive");
        }else {
            navigate("/notes");
        }
        deleteNote(noteId)
    }

    if(spinner) {
        return <Loading />
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