import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, verifyemail } from "../../firebase";
import "./SignupEmail.css";
import logo from "../images/FactoryPulse.svg";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    const interval = setInterval(() => {
      user
        ?.reload()
        .then(() => {
          if (user?.emailVerified) {
            clearInterval(interval);
            console.log("Está correto!!!!!!");
            verifyemail(user.uid);
          }
          console.log("NÂO ESTÁ!!!!!!");
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  return (
    <div>
      <div className="loginflex">
        <div className="left">
          <div className="imageContainer">
            <img src={logo} alt="Logo" className="logo-principal" />
          </div>
          <div className="register__container">
            <h3>Por favor, verifique o seu email para ativar a sua conta.</h3>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <a href="#top" className="signupEmail-exit" onClick={logout}>
            <FaRegArrowAltCircleLeft className="iconleftarrow" />
          </a>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
export default Register;
