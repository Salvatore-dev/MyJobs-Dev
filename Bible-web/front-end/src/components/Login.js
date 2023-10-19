import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ sendData, checkSession }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const [response, setResponse] = useState({});
  const [checkLogin, setCheckLogin] = useState(false);
  const [status, setStatus] = useState(200);
  const [awaitLogin, setAwaitLogin] = useState(false);

  useEffect(() => {
    sendData(response);
    console.log("sono nella login", response);
  }, [response]);

  useEffect(() => {
    if (username && password) {
      setCheckForm(true);
    } else {
      setCheckForm(false);
    }
  }, [username, password]);

  async function sendValues() {
    axios.defaults.withCredentials = true;
    setAwaitLogin(true);
    const dataToSend = {
      username: username,
      password: password,
    };

    console.log(dataToSend);
    try {
      const data = await axios.post(
        "http://localhost:8000/users/session",
        dataToSend
      );
      const response = data.data;
      console.log("sono nella login", response);
      console.log("sono nella login", data.status);
      setStatus(data.status);
      if (response.check) {
        setResponse(response.data);
        setCheckLogin(true);
        setAwaitLogin(false);
      } else {
        setCheckLogin(false);
        setAwaitLogin(false);
      }
    } catch (error) {
      console.log(error);
      setCheckLogin(false);
      setAwaitLogin(false);
      setStatus(error.response.status); // se il server mi restituisce 403 la risposta entra nel cach, cosi prendo lo status
    }
    // Effettua la chiamata API o altre operazioni con i dati
    console.log(status);
  }
  function Redirect() {
    return (
      <div className="redirect">
        <button onClick={() => navigate("/")}>Vai alla Home</button>
      </div>
    );
  }

  useEffect(() => {
    checkSession(checkLogin);
  }, [checkLogin]);

  function resetValues() {
    setUsername("");
    setPassword("");
    setStatus(200);
  }

  return (
    <div className="form-users">
      <h1>Login</h1>
      <div className="login-container">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          autoComplete="on"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="psw"
          value={password}
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="cancelbtn"
          style={{
            display: checkLogin && "none",
            pointerEvents: awaitLogin && "none",
          }}
          type="button"
          onClick={resetValues}
        >
          {status === 200
            ? "Cancella"
            : "La Username o la Password non corrispondono, ritenta!"}
        </button>
        <button
          type="submit"
          style={{
            display: "flex",
            justifyContent: "center",
            pointerEvents: (!checkForm || status !== 200) && "none",
            backgroundColor: !checkForm && "rgb(218, 218, 0)",
            color: !checkForm && "black",
            pointerEvents: (awaitLogin || checkLogin) && "none",
          }}
          onClick={sendValues}
        >
          {checkLogin
            ? "Complimenti acesso effettuato con successo"
            : awaitLogin
            ? "Loading..."
            : checkForm
            ? "Login"
            : "Inserici i dati nel modulo di accesso"}
          {awaitLogin && (
            <div className="loader" style={{ marginLeft: "10px" }}></div>
          )}
        </button>
        {checkLogin && <Redirect />}
      </div>
    </div>
  );
};

export default Login;
