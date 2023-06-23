import { SearchBar } from "components/SearchBar/SearchBar";
import { TextCard } from "components/TextCard/TextCard";
import { NoteList } from "containers/NoteList/NoteList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function NoteBrowser(){
    const noteList = useSelector(store => store.noteSlice.noteList);
    const [searchTerm, setSearchTerm] = useState("");
    const filterNoteList= noteList.filter((note)=>{
        const containsTitle=note.title.trim().toUpperCase().includes(searchTerm.trim().toUpperCase());
        const containsContent=note.content.trim().toUpperCase().includes(searchTerm.trim().toUpperCase());
        return containsTitle||containsContent;
    })
    return (
        <>
        <div className="row justify-content-center mb-5">
            <div className="col-sm-12 col-md-4">
            <SearchBar onTextChange={setSearchTerm} placeholder={"Search your notes...."}/>
            </div>
        </div>
        
            {noteList.length===0 && <div className="d-flex justify-content-center">
            <span>
            You don't have any note, do you want to <Link to="/note/new"> create one</Link></span>
            </div>}
             <NoteList noteList={filterNoteList}/>
        </>
    );
}