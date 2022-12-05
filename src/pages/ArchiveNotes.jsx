import { Link } from "react-router-dom"
import { showFormattedDate } from "../utils"
import { getArchivedNotes } from "../utils/local-data"

export const ArchiveNotes = () => {
    return <>
        {
             <div className="note-list">
            {
                (getArchivedNotes().length > 0 ) ? (
                    getArchivedNotes().map((note) => {
                        return <Link to={ '/notes/archive/' + note.id }  key={note.id}>
                                <div className="note-item">
                                    <h3 className="note-item__title">{note.title}</h3>
                                    <span className="note-item__createdAt">{showFormattedDate(note.createdAt)}</span>
                                    <p className="note-item__body">{note.body}</p>
                                </div>
                            </Link>
                    })
                ) : (
                    <>
                       <div className="note-item__empty">
                            <img src="./notes_empty.png" alt="notes_empty" />
                            Arsip kosong
                        </div> 
                    </>
                )
            }
        </div>
        }
    </>
}