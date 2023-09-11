import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import logo from "../images/FactoryPulse.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleKeyDownPass = (event) => {
    if (event.key === "Enter") {
      logInWithEmailAndPassword(email, password); //login with enter button press
    }
  };

  const handleKeyDownOther = (event) => {
    const passwordlogin = document.getElementById("passwordfield");
    if (event.key === "Enter") {
      passwordlogin.focus(); //select password field when pressing enter on e-mail field
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    logInWithEmailAndPassword("esi@emaf.com", "emaf123");
    if (user) navigate("/Dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="imageContainer">
            <img src={logo} alt="Logo" className="logo-principal" />
          </div>
          <div className="login__container">
            <div className="titulo_grande"> Inicie Sessão </div>
            <div className="titulo_pequeno"> E-MAIL </div>
            <input
              id="email"
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDownOther}
            />
            <div id="login-error-email-holder">
              <p id="login-error-email"></p>
            </div>
            <div className="titulo_pequeno"> PALAVRA-PASSE </div>
            <input
              id="passwordfield"
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDownPass}
            />
            <div id="login-error-password-holder">
              <p id="login-error-password"></p>
            </div>
            <div className="linkRight">
              <Link to="/reset">Esqueceu-se da palavra-passe?</Link>
            </div>
            <button
              className="login__btn"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              INICIAR SESSÃO
            </button>
            <div>
              Não tem conta? <Link to="/signup">Crie uma agora.</Link>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
export default Login;
