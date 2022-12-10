import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "../components/atoms/Input"
import { showFormattedDate } from "../utils"
import { getActiveNotes } from "../utils/local-data"

export const Notes = () => {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState(getActiveNotes())

    const handleSearchNotes = (e) => {
        e.preventDefault()
        setSearch(e.target.value)

        let searchText, result
        if (!notes) {
            setNotes([])
        }

        searchText = e.target.value
        if (!searchText) {
            setNotes(getActiveNotes())
        }

        if (searchText.length > 0) {
            searchText = searchText.toLowerCase()
            result = notes.filter((it) => it['title'].toLowerCase().includes(searchText))
            if (result && result.length > 0) {
                setNotes(result)
            }  else {
                setNotes([])
            }
        }
    }

    return <>

        <div style={{ 'margin': '10px 0' }}>
            <Input type="search" placeholder="Cari Catatan" value={search} onChange={(e) => handleSearchNotes(e)}/>
        </div>
       
        <div className="note-list">
            {
                (notes.length > 0 ) ? (
                    notes.map((note) => {
                        return <Link to={ '/notes/' + note.id }  key={note.id}>
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
                            <img src="./notes_empty.png" alt="notes_empty" />
                            Tidak ada catatan
                        </div> 
                    </>
                )
            }
        </div>
    </>
}