import { useEffect, useState } from "react";
import axios from "axios";
import background from "../assets/pergamena-3.jpg"
import background2 from "../assets/pergamena-1.jpg"

export default function UserProfile({
  profile,
  profileSession,
  newFavorite,
  upDateFavorite,
  getProfile,
}) {
  const [username, setUsername] = useState("");
  console.log("sono nella user verifico session", profile);
  const [checkSession, setCheckSession] = useState(false);
  const [favorites, setFavorites] = useState(null);
  const [checkUpdate, setCheckUpdate] = useState(true);

  useEffect(() => {
    console.log("sono nella use effetct, new favorites", newFavorite);
    if (newFavorite?.length > 0) {
      console.log("sono nella use effetct, new favorites 2", newFavorite);
      setFavorites(newFavorite);
    }
  }, [newFavorite]);

  useEffect(() => {
    setUsername(profile);
  }, [profile]);

  useEffect(() => {
    console.log("profile verifico cosa e ", profileSession);
    setCheckSession(profileSession);
  }, [profileSession]);

  useEffect(() => {
    if (getProfile) {
      setFavorites(getProfile.favoriteVerses);
    }
  }, [getProfile]);

  async function removeFavorite(favorite) {
    axios.defaults.withCredentials = true;
    if (username) {
      setCheckUpdate(false);
      try {
        const data = await axios.patch(
          `http://localhost:8000/users/${username}/profile/favorite`,
          {
            verse: favorite?.verse,
            text: favorite?.text,
          }
        );
        const result = data.data;
        console.log("il risultato della remove", result);
        if (result.check) {
          //const a = result.data.map((el) => el.verse)
          setFavorites(result.data);
          upDateFavorite(result.data);
          setCheckUpdate(true);
          console.log("controllo cosa setto", result.data);
        }
      } catch (error) {
        console.log("sono nel catch del remove favorite");
      }
    }
  }
  console.log("controllo favorites in user", favorites);
  return (
    <div className="user-detail" style={{ display: !checkSession && "none",
    backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}>
      {favorites && checkSession ? (
        <div>
          <h2>Ciao <span>{username}</span></h2>
          {favorites?.length >= 1 ? (
            <div className="favorites">
              <h4>Ecco i tuoi brani preferiti: </h4>
              <br></br>
              {favorites.map((el, i) => (
                <div className="list-favorites" key={i}>
                  <p key={i}>
                    <span key={i + 100}>{el.verse}: </span>
                    {el.text}
                  </p>
                  <input
                    key={i + 200}
                    type="submit"
                    value={"Rimuovi"}
                    style={{ pointerEvents: !checkUpdate && "none" }}
                    name="remove-favorite"
                    onClick={() => removeFavorite(el)}
                  ></input>
                </div>
              ))}
            </div>
          ) : (
            <h4>Al momento non ci sono brani della Bibbia preferiti</h4>
          )}
        </div>
      ) : null}
    </div>
  );
}
