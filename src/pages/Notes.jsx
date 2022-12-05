import { Link } from "react-router-dom"
import { showFormattedDate } from "../utils"
import { getActiveNotes } from "../utils/local-data"

export const Notes = () => {
    return <>
        <div className="note-list">
            {
                (getActiveNotes().length > 0 ) ? (
                    getActiveNotes().map((note) => {
                        return <Link to={ '/' + note.id }  key={note.id}>
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
                            <img src="./undraw_No_data_re_kwbl.png" alt="" />
                            Tidak ada catatan aktif
                        </div> 
                    </>
                )
            }
        </div>
    </>
}