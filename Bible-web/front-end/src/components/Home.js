import { useEffect, useState } from "react";
import axios from "axios";
import { RequestInvalid } from "./Request-invalid";
import { NoKeyword } from "./InvalidKeyword";
import Introduction from "./Introduction";
import UserProfile from "./User";
import Text from "./Text";
import CEI2008 from "../data/index-version-Cei2008.json";

const books = CEI2008.indexes.CEI2008.biblebooks;
const abbreviations = CEI2008.indexes.CEI2008.abbreviations;

const Home = ({ keyword, control, newChapter, getUserLogin, checkSession }) => {
  const [checkKeyword, setCheckKeyword] = useState(false);
  const [checkVerse, setCheckVerse] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [newKeyword, setNewKeyword] = useState("");
  const [sendVerses, setSendVerses] = useState(null); // []

  const [checkChapter, setCheckChapter] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesB, setFavoritesB] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [invaliRequest, setInvalidRequest] = useState(false);
  const [invalidKeyword, setInvalidKeyword] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    if (getUserLogin) {
      //console.log("controllare dati", getUserLogin);
      //console.log("controllo username", getUserLogin.username);
      //console.log("controllo preferiti", getUserLogin.favoriteVerses);
      setUser(getUserLogin.username);
      setFavoritesB(getUserLogin.favoriteVerses);
      setProfileUser(getUserLogin);
      setSendVerses(null)
      setNewKeyword("")
      setChapter(null)
      setCheckChapter(false)
      setCheckKeyword(false)
      setCheckVerse(false)
    }
  }, [getUserLogin]);

  useEffect(() => {
    if (keyword) {
      setNewKeyword(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    setChapter(newChapter);
  }, [newChapter]);

  useEffect(() => {
    if (newKeyword === "") {
      return;
    }
    const fetchdata = async () => {
      if (control && newKeyword) {
        // invece di controll
        setInvalidRequest(false);
        const checkKeywordPlus = newKeyword.search(/\d/) !== -1;
        setInvalidKeyword(checkKeywordPlus);
        if (!checkKeyword && newKeyword.length >= 3 && !checkKeywordPlus) {
          try {
            const responses = await axios.get(
              `http://localhost:8000/books/keywords/search?keyword=${newKeyword}`
            ); 
            //console.log(responses.data);
            const { results } = responses.data.data;
            setSendVerses(results);
            setCheckKeyword(true);
            setCheckVerse(false);
            setCheckChapter(false);
          } catch (error) {
            console.error(error);
            setCheckKeyword(false);
            setInvalidKeyword(true);
          }
          // console.log(newKeyword);
          //console.log(" il plus", checkKeywordPlus);
        } else {
          // console.log(newKeyword);
          // console.log(" il plus", checkKeywordPlus);
          setCheckKeyword(false);
          setCheckVerse(false); // aggiunto dopo2
          setCheckChapter(false); // aggiunto dopo2
          //console.log("keyword non corretta");
          return;
        }
      } else {
        try {
          setCheckKeyword(false);
          const request = newKeyword;
          const verse = request.split(",")[1];
          const toDecompose = request.split(",")[0];

          const regex = /^(\d?[A-Za-z]+)(\d+)$/;
          const match = toDecompose.match(regex);
          let book = "";
          let chapter = "";
          if (match) {
            book = match[1]; // Abbreviazione del libro
            chapter = parseInt(match[2], 10); // Numero del capitolo

            //console.log("Abbreviazione del libro:", book);
            const indexRequest = abbreviations.indexOf(book);
            book = books[indexRequest];
            //console.log("Numero del capitolo:", chapter);
            //console.log(verse);
            setCheckVerse(true);
            const responses = await axios.get(
              `http://localhost:8000/books/${book}/chapters/${chapter}/verses/${verse}`
            ); //esempio di ricerca per versetti
            console.log(responses.data); // Puoi fare qualcosa con la risposta qui
            if (responses.data?.error) {
              console.log("richiesta invalida");
              setCheckVerse(false);
              setCheckChapter(false);
              setCheckKeyword(false);
              setInvalidRequest(true);
            } else {
              const results = responses.data.data;
              setSendVerses(results);
              setCheckVerse(true);
              setInvalidRequest(false);
              setCheckKeyword(false);
              setCheckChapter(false);
            }
          } else {
            console.log("richiesta invalida");
            setCheckVerse(false);
            setInvalidRequest(true);
            setCheckChapter(false);
            setCheckKeyword(false);
          }
        } catch (error) {
          console.error(error);
          setCheckVerse(false);
          setInvalidRequest(true);
          setCheckChapter(false);
          setCheckKeyword(false);
        }
      }
    };
    fetchdata();
  }, [newKeyword]);

  useEffect(() => {
    if (chapter) {
      //console.log("sono nella home", newChapter);
      const book = chapter?.book; // newcapter
      //console.log(book);
      const Chapter = chapter?.chapter?.split(" ")[1]; // newchapter
      //console.log(chapter);
      const fetchChapter = async () => {
        try {
          const data = await axios.get(
            `http://localhost:8000/books/${book}/chapters/${Chapter}`
          );
          const result = data.data;
          console.log(result);
          if (result.error) {
            setCheckChapter(false);
          } else {
            setSendVerses(result.data);
            setCheckChapter(true);
            setCheckKeyword(false);
            setCheckVerse(false);
          }
        } catch (error) {
          console.log(error);
          setCheckChapter(false);
        }
      };
      fetchChapter();
    }
  }, [chapter]); 

  // console.log("controllo capitoli", checkChapter);
  // console.log("controllo versi", checkVerse);
  // console.log("contollo argomento", checkKeyword);

  return (
    <div className="body-main">
      <div className="body-text">
        {!checkChapter && !checkKeyword && !checkVerse ? (
          invaliRequest ? (
            <RequestInvalid />
          ) : invalidKeyword ? (
            <NoKeyword />
          ) : (
            <Introduction />
          )
        ) : (
          <Text
            data={sendVerses}
            username={user}
            upDateFavorite={setFavorites}
            newfavorite={favoritesB}
            controlKeyword={checkKeyword}
            controlSession={checkSession}
            keyword={newKeyword}
          />
        )}
      </div>
      <div className="profile">
        <UserProfile
          profile={user}
          profileSession={checkSession}
          newFavorite={favorites}
          upDateFavorite={setFavoritesB}
          getProfile={profileUser}
        />
      </div>
    </div>
  );
};

export default Home;
