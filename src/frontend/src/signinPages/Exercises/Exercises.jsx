import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerNewExercise,
  getExercises,
  deleteUser,
} from "../../firebase";
import "./Exercises.css";
import Sidebar from "../../components/Sidebar/Sidebar";
//import Navbar from "../../components/Navbar/Navbar";
import { /*Link, */useNavigate, } from "react-router-dom";
import { NotificationManager } from "react-notifications";

function Exercises() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [targetarea, settargetarea] = useState("");

  const [Exercises, setExercises] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLastKeyDown = (event) => {
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
      }
    } 
  };

  const register = () => {

    if (!name) {
      //Blank name error
      NotificationManager.error("NAME MUSTN'T BE BLANK");
    }

    if (name) {
      registerNewExercise(
        name,
        description,
        targetarea
        );
      NotificationManager.success("NEW EXERCISE ADDED");
      } 
  };

  const handleDeleteUser = async (uid) => {
    try {
      await deleteUser(uid);
      // User deleted successfully
      NotificationManager.success("Utilizador apagado com sucesso!");
    } catch (error) {
      // An error occurred while deleting the user
      NotificationManager.error("Erro ao apagar Utilizador!");
      console.error(error);
    } 
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getExercises().then((exercises) => {
      console.log(exercises);
      setExercises(exercises);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <Sidebar ParentPage="Funcionários">
      {/*<Navbar CurrentPage="Funcionários">*/}
        <div classname="sigmabackground">
          <div className="exercises-add-exercise-box">
            <div className="func-titulo">NEW EXERCISE</div>
            <div className="func-row">
              <div className="func-inputName">
                <div className="func-subTitulo">Name</div>
                <input
                  id="fullnameregister"
                  type="text"
                  className="sigmatextBox"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(event) =>
                    handleKeyDownEnterNext(event, "fullnameregister")
                  }
                />
              </div>
              <div className="func-inputName">
                <div className="func-subTitulo">Description</div>
                <input
                  id="emailregister"
                  type="text"
                  className="sigmatextBox"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  onKeyDown={(event) =>
                    handleKeyDownEnterNext(event, "emailregister")
                  }
                />
              </div>
            </div>

            <div className="func-row">
              <div className="func-inputName">
                <div className="func-subTitulo">Muscle Targeted</div>
                <input
                  id="passregister"
                  type="text"
                  className="sigmatextBox"
                  value={targetarea}
                  onChange={(e) => settargetarea(e.target.value)}
                  onKeyDown={(event) =>
                    handleLastKeyDown(event)
                  }
                />
              </div>
            </div>
            <button className="sigmabtn" onClick={register}>
              ADD EXERCISE
            </button>
          </div>
        </div>

        <div className="exercises-add-exercise-box">
          <div className="func-titulo">MY EXERCISES</div>
          <table className="func-table">
            <tbody>
              {Exercises
                .sort((a, b) =>
                  a.name && b.name ? a.name.localeCompare(b.name) : 0
                )
                .map((exercise) => (
                  <tr key={exercise.name}>
                    <td>{exercise.name} </td>
                    <td>{exercise.targetarea}</td>
                    <td>
                      <button
                        className="func-apagar"
                        onClick={() => navigate("/exercises/"+user.uid+"/"+exercise.name, {userID:user.uid, exercisename:exercise.name})}
                      >
                        EDIT
                      </button>
                    </td>
                    <td>
                      <button
                        className="func-apagar"
                        onClick={() => handleDeleteUser("USER")}
                      >
                        DELETE FALTA
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      {/*</Navbar>*/}
    </Sidebar>
  );
}
export default Exercises;
