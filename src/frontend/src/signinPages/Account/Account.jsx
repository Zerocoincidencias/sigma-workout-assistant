import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { AccountValues , updateRegistry } from "../../firebase";
import logo from "./assets/images/Esi-azul.svg";
import { NotificationManager } from "react-notifications";

function Account() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEditable,  setIsEditable ] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [NIF, setNIF] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    AccountValues((userData) => {
      setUserData(userData);
      setName(userData?.name);
      setAddress(userData?.address);
      setPhone(userData?.phone);
      setNIF(userData?.NIF);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

   const handleButtonClick = async () => {
    if (isEditable) {
      const stateUpdate = await updateRegistry(
        auth.currentUser.uid,
        name,
        address,
        phone,
        NIF
      );
      console.log(stateUpdate);
      if (stateUpdate === 1)
        NotificationManager.success("Dados atualizados com sucesso!");
      else if (stateUpdate !== 1)
        NotificationManager.error("Erro ao atualizar dados!");
    }
    setIsEditable(!isEditable);
  };

  return (
    <Sidebar ParentPage="Conta">
      <Navbar CurrentPage="Conta">
        <div className="conta-box">
          <div className="conta-box-flex">
            <div className="conta-box-left">
              <img className="logoEmpresa" src={logo} alt="Empresa Logo" />
              <div className="conta-nameInput">
                <div className="conta-subTitulo">Nome</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        border: "none",
                        fontSize: "1.1rem",
                        width: "100%",
                        color: "black",
                        overflowWrap: "break-word",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span> {userData?.name}</span>
                  )}
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">E-mail</div>
                <div className="conta-info">
                  <span>{userData?.email}</span>
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">Cargo</div>
                <div className="conta-info">
                  <span>{userData?.role}</span>
                </div>
              </div>
            </div>

            <div className="conta-box-right">
              <div className="conta-nameInput">
                <div className="conta-subTitulo">Estado da conta</div>
                <div className="conta-info">
                  <span>{userData?.licensekey}</span>
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">UserID</div>
                <div className="conta-info">
                  <span>{userData?.uid}</span>
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">Morada</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        border: "none",
                        fontSize: "1.1rem",
                        width: "100%",
                        color: "black",
                        overflowWrap: "break-word",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span>{address}</span>
                  )}
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">Contacto</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        border: "none",
                        fontSize: "1.1rem",
                        width: "100%",
                        color: "black",
                        overflowWrap: "break-word",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span>{userData?.phone}</span>
                  )}
                </div>
              </div>
              <div className="conta-nameInput">
                <div className="conta-subTitulo">NIF</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={NIF}
                      onChange={(e) => setNIF(e.target.value)}
                      style={{
                        border: "none",
                        fontSize: "1.1rem",
                        width: "100%",
                        color: "black",
                        overflowWrap: "break-word",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <span>{userData?.NIF}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-center">
            <button
              className="conta-editarBtn"
              style={{ background: isEditable ? "#007fff" : "#49b6ff" }}
               onClick={handleButtonClick}
            >
              {isEditable ? "Submeter" : "Editar campos"}
            </button>
          </div>
        </div>
      </Navbar>
    </Sidebar>
  );
}
export default Account;
