import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./OTP.css";
import { auth, checklicense, logout } from "../../firebase";
import { useState } from "react";
import { checkOTP } from "../../firebase";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

function OTP() {
  const [OTPvalue, setOTP] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [setsuccess] = useState("");

  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);
    if (event.key === "Enter") {
      const uid = auth.currentUser.uid;
      checkOTP(uid, OTPvalue).then(function (value) {
        setsuccess(value);
      });
    }
  };

  const handleClick = () => {
    const uid = auth.currentUser.uid;
    checkOTP(uid, OTPvalue).then(function (value) {
      setsuccess(value);
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    checklicense().then((result) => {
      if (result === false) {
        navigate("/dashboard");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div>
      <div className="body2">
        <div className="otp__container">
          <div className="titulo_grande otp-big">
            {" "}
            Bem-vindo a FactoryPulse{" "}
          </div>
          <div className="titulo_pequeno otp-small">
            Insira a chave de ativação para continuar{" "}
          </div>
          <input
            type="password"
            minLength={6}
            maxLength={6}
            fontSize="x-large"
            className="otp__textBox"
            value={OTPvalue}
            onChange={(e) => setOTP(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div id="otp-error-holder">
            <p id="otp-error"></p>
          </div>
          <button className="otp__btn" onClick={handleClick}>
            ATIVAR CONTA
          </button>
        </div>
        <div className="otp-exit">
          <FaRegArrowAltCircleLeft
            className="iconleftarrow"
            id="btn"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}
export default OTP;
