import { useNavigate } from "react-router-dom";
import { Form } from "../components/molecules/Form";
import { addNote } from "../utils/api";

export function AddNotes() {
    const navigate = useNavigate()
    
    const onSubmitHandler = (e) => {
        addNote(e)
        navigate("/notes");
    }

    return (
            <>
                <Form onSubmitForm={(e) => onSubmitHandler(e)} />
            </>
    );
}

