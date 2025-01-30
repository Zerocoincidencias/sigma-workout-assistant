import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  getExercises,
  registerNewWorkoutPlan
} from "../../firebase";
import "./Workouts.css";
import Sidebar from "../../components/Sidebar/Sidebar";
//import Navbar from "../../components/Navbar/Navbar";
import { /*Link, */useNavigate, } from "react-router-dom";
import { NotificationManager } from "react-notifications";

function Workouts() {
  const [name, setName] = useState("");
  const [selectedExercises, setselectedExercises] = useState([]);

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
      //alert("registernewworkout")
      console.log(selectedExercises);
      registerNewWorkoutPlan(
        name,
        selectedExercises
        );
      NotificationManager.success("NEW WORKOUT PLAN ADDED");
      } 
  };

  const AddExercise = async (name) => {
    const Exercisefield = document.getElementById("selectedExercises");

    try {
      if (Exercisefield.value !== "" )
       {
        Exercisefield.value += "," + name ;
      }
      
      else
      {
        Exercisefield.value += name;
      }

      setselectedExercises(Exercisefield.value.split(','))
    } catch (error) {
      // An error occurred while deleting the user
      NotificationManager.error("Erro ao adicionar exercício!");
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
        <div>
          <div className="adicionar-utilizador-box">
            <div className="func-titulo">NEW WORKOUT PLAN</div>
            <div className="func-row">
              <div className="func-inputName">
                <div className="func-subTitulo">Name</div>
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
              </div>
              <div className="func-inputName">
                <div className="func-subTitulo">Exercises</div>
                <input
                  id="selectedExercises"
                  type="text"
                  className="register__textBox"
                  value={selectedExercises}
                  onChange={(e) => setselectedExercises(e.target.value.split(','))}
                  onKeyDown={(event) =>
                    handleLastKeyDown(event)
                  }
                />
              </div>
            </div>


            <button className="func-register__btn" onClick={register}>
              ADD WORKOUT PLAN
            </button>
          </div>
        </div>

        <div className="adicionar-utilizador-box2">
          <div className="func-titulo">MY EXERCISES</div>
          <table className="func-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Edit</th>
                <th>Add</th>
              </tr>
            </thead>
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
                        onClick={() => AddExercise(exercise.name)}
                      >
                        ADD
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
export default Workouts;
