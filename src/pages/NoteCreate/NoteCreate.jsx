import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export function NoteCreate(){
    const dispatch=useDispatch();
    const navigate=useNavigate()
    async function submit(formValues){
        
        const createdNote= await NoteAPI.create({...formValues,created_at: new Date().toLocaleDateString(),})
        dispatch(addNote(createdNote))
        alert("The note has been created!");
        navigate('/')
    }
    return (
        <>
            <NoteForm title={"Create Note"} onSubmit={submit}/>
        </>
    );
}