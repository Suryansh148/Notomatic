import { NoteForm } from "components/NoteForm/NoteForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { NoteAPI } from "api/note-api";
import { updateNote } from "store/notes/notes-slice";
import { deleteNote } from "store/notes/notes-slice";
export function Note(){
    const {noteId} = useParams();
    const note = useSelector((store)=>store.noteSlice.noteList.find((note)=>noteId===note.id));
    const [isEditable, setIsEditable]= useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submit = async (formValues)=>{
       const updatedNote= await NoteAPI.updateById(note.id,formValues);
       dispatch(updateNote(updatedNote));
       setIsEditable(false);
    }
    async function deleteNote_ (){
        if(window.confirm("Delete Note ?"))
        NoteAPI.deleteById(note.id);
        dispatch(deleteNote(note));
        navigate("/");

    }
    return (
        <>
            {note&& <NoteForm
                isEditable={isEditable}
                title={isEditable?"Edit Note":note.title}
                note = {note}
                onClickDelete={deleteNote_}
                onClickEdit={()=>setIsEditable(!isEditable)}
                onSubmit={isEditable && submit}
            />}
        </>
    );
}