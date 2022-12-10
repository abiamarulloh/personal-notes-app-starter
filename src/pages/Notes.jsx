import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "../components/atoms/Input"
import { Loading } from "../components/atoms/Loading"
import { LocaleConsumer } from "../contexts/LocaleContext"
import { showFormattedDate, translate } from "../utils"
import { getActiveNotes } from "../utils/api"

export const Notes = () => {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState([])
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        setActiveNotes()
    }, [])

    const setActiveNotes = () => {
        getActiveNotes().then(({data}) => {
            setNotes(data)
            setSpinner(false)
        }, () => {
            setSpinner(false)
        })
    }

    const handleSearchNotes = (e) => {
        e.preventDefault()
        setSearch(e.target.value)

        let searchText, result
        if (!notes) {
            setNotes([])
        }

        searchText = e.target.value
        if (!searchText) {
            setActiveNotes()
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


    if(spinner) {
        return <Loading />
    }

    return <>
        <LocaleConsumer>
            {
            ({ locale }) => {
                    return <> 
                    <div style={{ 'margin': '10px 0' }}>
                            <Input type="search" placeholder={ locale === 'id' ? 'Cari Catatan...' : 'Search note...' } value={search} onChange={(e) => handleSearchNotes(e)}/>
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
                                            { translate(locale, 'Tidak ada Catatan', 'Note not found')  }
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