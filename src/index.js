import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { App } from "App";
import { StrictMode } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { NoteBrowser } from "pages/NoteBrowser/NoteBrowser";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { Note } from "pages/Note/Note";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { SignIn } from "pages/SignIn/SignIn";
import { SignUp } from "pages/SignUp/SignUp";
import { FirebaseApp } from "utils/firebase";
import { ProtectedApp } from "App";
import { PersistGate } from "redux-persist/integration/react";
FirebaseApp.init();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Routes>
      <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<ProtectedApp/>}>
          <Route path="/" element={<NoteBrowser/>}/>
          <Route path="/note/:noteId" element={<Note/>}/>
          <Route path="/note/new" element={<NoteCreate/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      {/* <App /> */}
      </PersistGate>
    </Provider>
  
);
