import { Form } from "../components/molecules/Form";
import { addNote } from "../utils/local-data";

export function AddNotes() {
    const onSubmitHandler = (e) => {
        addNote(e)
        window.history.back("/notes");
    }

    return (
            <>
                <Form onSubmitForm={(e) => onSubmitHandler(e)} />
            </>
    );
}
