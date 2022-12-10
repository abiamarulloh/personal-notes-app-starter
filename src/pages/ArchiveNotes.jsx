import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Loading } from "../components/atoms/Loading"
import { LocaleConsumer } from "../contexts/LocaleContext"
import { showFormattedDate, translate } from "../utils"
import { getArchivedNotes } from "../utils/api"

export const ArchiveNotes = () => {
    const [notes, setNotes] = useState([])
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        getArchivedNotes().then(({data}) => {
            setNotes(data)
            setSpinner(false)
        }, () => {
            setSpinner(false)
        })
    }, [])

    if(spinner) {
        return <Loading />
    }

    return <>
        <LocaleConsumer>
                {
                ({ locale }) => {
                        return <> 
                        <div className="note-list">
                            {
                                (notes.length > 0 ) ? (
                                    notes.map((note) => {
                                        return <Link to={ '/notes/archive/' + note.id }  key={note.id}>
                                                <div className="note-item">
                                                    <h3 className="note-item__title">{note.title}</h3>
                                                    <span className="note-item__createdAt">{showFormattedDate(note.createdAt)}</span>
                                                    <p className="note-item__body list">{note.body}</p>
                                                </div>
                                            </Link>
                                    })
                                ) : (
                                    <>
                                    <div className="note-item__empty">
                                            <img src="/notes_empty.png" alt="" />
                                            { translate(locale, 'Arsip Kosong', 'Archive empty')  }
                                        </div> 
                                    </>
                                )
                            }
                            </div>
                        </>

                }
            }
        </LocaleConsumer>
    </>
}