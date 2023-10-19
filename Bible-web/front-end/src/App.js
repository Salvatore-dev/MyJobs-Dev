import "./App.css";
import "./data/forms-users.css";
import "./data/navBar.css"
import "./data/request-invalid.css"
import "./data/areaText.css"
import "./data/user-detail.css"
import "./data/introduction.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import PanelControl from "./components/PanelControl";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import SignUp from "./components/SignUp";
import Foot from "./components/Footer";
function App() {

const [research, setResearch] = useState('')
const [typeSearch, setTypeSearch] = useState(true)
const [getChapter, setGetChapter] = useState(null)
console.log("qui sto nell APP data research", research);
const[profile, setProfile] = useState(null)
const[checkLogin, setCheckLogin] = useState(false)

console.log("sono nel panel", research);

  return (
    <>
      <Header />
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<PanelControl getData={setResearch} controlSearch={setTypeSearch} sendChapter={setGetChapter} controlSession={checkLogin} setControlSession={setCheckLogin}/>}>
            <Route index element={<Home keyword={research} control={typeSearch} newChapter={getChapter} getUserLogin={profile} checkSession={checkLogin} />} />
            <Route path="/login" element={<Login sendData={setProfile} checkSession={setCheckLogin}/>} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
      <Foot />
    </>
  );
}

export default App;
