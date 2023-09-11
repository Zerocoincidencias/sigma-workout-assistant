import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import "./Signup.css";
import logo from "../images/FactoryPulse.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const [user, loading] = useAuthState(auth);

  const handleKeyDownPassConfirm = (event) => {
    if (event.key === "Enter") {
      register(); //run register function with enter button press
    }
  };

  const handleKeyDownEnterNext = (event, paramid) => {
    if (event.key === "Enter") {
      //when enter is pressed, selects next element depending on the hardcoded id passed in paramid

      if (paramid === "fullnameregister") {
        document.getElementById("emailregister").focus();
      } else if (paramid === "emailregister") {
        document.getElementById("passregister").focus();
      } else if (paramid === "passregister") {
        document.getElementById("passconfirmregister").focus();
      }
    }
  };

  const register = () => {
    const registerErrorName = document.getElementById("login-error-name");
    const registerErrorPasswordConf = document.getElementById(
      "login-error-password-confirm"
    );
    if (!name) {
      //Blank name error
      registerErrorName.style.display = "block";
      registerErrorName.innerHTML = "Nome inválido";
    } else {
      registerErrorName.style.display = "none";
      if (password ) {
        registerErrorPasswordConf.style.display = "none";
        if (password !== passwordconfirm) {
          //Passwords don't match error
          registerErrorPasswordConf.style.display = "block";
          registerErrorPasswordConf.innerHTML =
            "As palavras-passe não coincidem";
        } else {
          registerErrorPasswordConf.style.display = "none";
          registerWithEmailAndPassword(name, email, password);
        }
      } else {
        //Passwords can't be null
        registerErrorPasswordConf.style.display = "block";
        registerErrorPasswordConf.innerHTML =
          "Palavras-passe não pode estar vazia ";
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="imageContainer">
            <img src={logo} alt="Logo" className="logo-principal" />
          </div>
          <div className="register__container">
            <div className="titulo_grande"> Criar Conta </div>
            <div className="titulo_pequeno">NOME COMPLETO </div>
            <input
              id="fullnameregister"
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(event) =>
                handleKeyDownEnterNext(event, "fullnameregister")
              }
            />
            <div id="login-error-name-holder">
              <p id="login-error-name"></p>
            </div>

            <div className="titulo_pequeno">EMAIL </div>
            <input
              id="emailregister"
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(event) =>
                handleKeyDownEnterNext(event, "emailregister")
              }
            />
            <div id="login-error-email-holder">
              <p id="login-error-email"></p>
            </div>

            <div className="titulo_pequeno">PALAVRA-PASSE </div>
            <input
              id="passregister"
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event) =>
                handleKeyDownEnterNext(event, "passregister")
              }
            />
            <div id="login-error-password-holder">
              <p id="login-error-password"></p>
            </div>

            <div className="titulo_pequeno">CONFIRME A PALAVRA-PASSE </div>
            <input
              id="passconfirmregister"
              type="password"
              className="register__textBox"
              value={passwordconfirm}
              onChange={(e) => setPasswordconfirm(e.target.value)}
              onKeyDown={handleKeyDownPassConfirm}
            />
            <div id="login-error-password-confirm-holder">
              <p id="login-error-password-confirm"></p>
            </div>
            <div className="linkRight">
              <Link to="/">Já tem conta? Inicie sessão</Link>
            </div>
            <button className="register__btn" onClick={register}>
              CRIAR CONTA
            </button>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Register;
