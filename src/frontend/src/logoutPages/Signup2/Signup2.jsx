import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerDetails } from "../../firebase";
import "./Signup2.css";
import logo from "../images/FactoryPulse.svg";

function Register() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [NIF, setNIF] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleKeyDownSubmit = (event) => {
    if (event.key === "Enter") {
      registerDetails(auth.currentUser.uid, address, phone, NIF); //run register function with enter button press
    }
  };

  const handleClick = () => {
    registerDetails(auth.currentUser.uid, address, phone, NIF);
    auth.onAuthStateChanged(function (user) {
      if (user && user.emailVerified) {
        navigate("/OTP");
      }
    });
  };

  const handleKeyDownEnterNext = (event, paramid) => {
    if (event.key === "Enter") {
      //when enter is pressed, selects next element depending on the hardcoded id passed in paramid

      if (paramid === "addressregister") {
        document.getElementById("phoneregister").focus();
      } else if (paramid === "phoneregister") {
        document.getElementById("NIFregister").focus();
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    //if (user) navigate("/Dashboard");
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
            <div className="titulo_grande"> Dados adicionais </div>
            <div className="titulo_pequeno"> MORADA </div>
            <input
              id="addressregister"
              type="text"
              className="register__textBox"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(event) =>
                handleKeyDownEnterNext(event, "addressregister")
              }
            />
            <div className="titulo_pequeno"> NÚMERO DE TELEFONE </div>
            <input
              id="phoneregister"
              type="text"
              className="register__textBox"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(event) =>
                handleKeyDownEnterNext(event, "phoneregister")
              }
            />
            <h3>NIF</h3>
            <input
              id="NIFregister"
              type="text"
              className="register__textBox"
              value={NIF}
              onChange={(e) => setNIF(e.target.value)}
              onKeyDown={(event) => handleKeyDownSubmit(event, "NIFregister")}
            />
            <div id="login-error-NIF-holder">
              <p id="login-error-NIF"></p>
            </div>
            <button className="register__btn" onClick={handleClick}>
              Finalizar
            </button>
          </div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Register;
