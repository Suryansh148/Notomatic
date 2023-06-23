import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import s from "./style.module.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Outlet} from "react-router-dom"
import { setNoteList } from "store/notes/notes-slice";
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";
export function App() {
  const dispatch = useDispatch();
  async function fetchAllNotes(){
    const noteList= await NoteAPI.fetchAll();
    
    dispatch(setNoteList(noteList));
  }
  useEffect(()=>{
    // fetchAllNotes();
    const unsub = NoteAPI.onShouldSyncNotes(fetchAllNotes);
    return ()=>{
      unsub();
    }
  },[])
  const navigate=useNavigate();
  return <div>
        <Header/>
        <ButtonPrimary className={s.buttonAdd} onClick={()=>{
                navigate("/note/new")
            }} >
                +
            </ButtonPrimary>
        <div className={s.workspace}>
          <Outlet/>
        </div>
        
  </div>;
}

export const ProtectedApp = withAuthRequired(App);
