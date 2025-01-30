import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {/* useNavigate, useLocation, */useParams } from "react-router-dom";
import "./Exercise.css";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
//import Navbar from "../../components/Navbar/Navbar";
import { ExerciseValues , updateExercise } from "../../firebase";
//import logo from "./assets/images/Esi-azul.svg";
import { NotificationManager } from "react-notifications";

function Exercise() {
  const {userID} = useParams();
  const {exercisename} = useParams();
  const [user, loading] = useAuthState(auth);
  //const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEditable,  setIsEditable ] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetarea, setTargetArea] = useState("");

  //const location = useLocation();
  //alert(location.state);

  useEffect(() => {
    if (loading) return;
    //if (!user) return navigate("/");
    ExerciseValues(userID,exercisename,(exerciseData) => {
      
      setUserData(exerciseData);
      setName(exerciseData?.name);
      setDescription(exerciseData?.description);
      setTargetArea(exerciseData?.targetarea);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

   const handleButtonClick = async () => {
    if (isEditable) {
      const stateUpdate = await updateExercise(
        name,
        description,
        targetarea,
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
    <Sidebar ParentPage="Exercises">
        <div className="conta-box">
          <div className="conta-box-flex">
            <div className="conta-box-left">
              {/*<img className="logoEmpresa" src={logo} alt="Empresa Logo" />*/}
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
            </div>

            <div className="conta-box-right">
              <div className="conta-nameInput">
                <div className="conta-subTitulo">DESCRIPTION</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                    <span>{description}</span>
                  )}
                </div>
              </div>

              <div className="conta-nameInput">
                <div className="conta-subTitulo">TARGET AREA</div>
                <div className="conta-info">
                  {isEditable ? (
                    <input
                      type="text"
                      value={targetarea}
                      onChange={(e) => setTargetArea(e.target.value)}
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
                    <span>{targetarea}</span>
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
    </Sidebar>
  );
}
export default Exercise;
