import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
//import Navbar from "../../components/Navbar/Navbar";
import { AccountValues , updateRegistry } from "../../firebase";
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
      {/*<Navbar CurrentPage="Conta">*/}
        <div className="me-box">
          <div className="me-box-flex">
              <div className="me-nameInput">
                <div className="me-subTitulo">Nome</div>
                <div className="me-info">
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
              <div className="me-nameInput">
                <div className="me-subTitulo">E-mail</div>
                <div className="me-info">
                  <span>{userData?.email}</span>
                </div>
              </div>
              <div className="me-nameInput">
                <div className="me-subTitulo">Cargo</div>
                <div className="me-info">
                  <span>{userData?.role}</span>
                </div>
              </div>

              <div className="me-nameInput">
                <div className="me-subTitulo">Estado da conta</div>
                <div className="me-info">
                  <span>{userData?.licensekey}</span>
                </div>
              </div>
              <div className="me-nameInput">
                <div className="me-subTitulo">UserID</div>
                <div className="me-info">
                  <span>{userData?.uid}</span>
                </div>
              </div>
              <div className="me-nameInput">
                <div className="me-subTitulo">Morada</div>
                <div className="me-info">
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
              <div className="me-nameInput">
                <div className="me-subTitulo">Contacto</div>
                <div className="me-info">
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
              <div className="me-nameInput">
                <div className="me-subTitulo">NIF</div>
                <div className="me-info">
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
          <div className="btn-center">
            <button
              className="me-btn"
               onClick={handleButtonClick}
            >
              {isEditable ? "Submeter" : "Editar campos"}
            </button>
          </div>
        </div>
      {/*</Navbar>*/}
    </Sidebar>
  );
}
export default Account;
