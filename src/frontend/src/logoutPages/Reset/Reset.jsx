import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import "./Reset.css";
import logo from "../images/FactoryPulse.svg";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleKeyDownEmailReset = (event) => {
    if (event.key === "Enter") {
      sendPasswordReset(email); //run sendpasswordreset function with enter button press
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="imageContainer">
            <img src={logo} alt="Logo" className="logo-principal" />
          </div>
          <div className="reset__container">
            <div className="titulo_grande"> Recupere a sua palavra-passe </div>
            <div className="titulo_pequeno"> E-MAIL </div>
            <input
              type="text"
              className="reset__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDownEmailReset}
            />
            <div id="login-error-email-holder">
              <p id="login-error-email"></p>
            </div>
            <div className="linkRight">
              <Link to="/signup">Não tem conta? Crie uma agora</Link>
            </div>
            <button
              className="reset__btn"
              onClick={() => sendPasswordReset(email)}
            >
              Enviar Email
            </button>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Reset;
