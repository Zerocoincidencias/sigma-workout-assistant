import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./logoutPages/Login/Login";
import Signup from "./logoutPages/Signup/Signup";
import Signup2 from "./logoutPages/Signup2/Signup2";
import Exercises from "./signinPages/Exercises/Exercises";
import Reset from "./logoutPages/Reset/Reset";
import Dashboard from "./signinPages/Dashboard/Dashboard";
import Account from "./signinPages/Account/Account";
import OTP from "./logoutPages/OTP/OTP";
import Users from "./signinPages/Users/Users";
import Agenda from "./signinPages/Agenda/Agenda";
import Maquina from "./signinPages/Maquina/Maquina";
import Definicoes from "./signinPages/Definicoes/Definicoes";
import Celula from "./signinPages/Celula/Celula";
import Exercise from "./signinPages/Exercise/Exercise";
import Workouts from "./signinPages/Workouts/Workouts";
import SignupEmail from "./logoutPages/SignupEmail/SignupEmail";
import { NotificationContainer } from "react-notifications";
import { GlobalState } from "./GlobalState";
import "./App.css";

function App() {
  return (
    <GlobalState>
      <div className="app">
        <Router>
          <NotificationContainer />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signup2" element={<Signup2 />} />
            <Route exact path="/signupemail" element={<SignupEmail />} />
            <Route exact path="/exercises" element={<Exercises />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/definicoes" element={<Definicoes />} />
            <Route exact path="/agenda" element={<Agenda />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/OTP" element={<OTP />} />
            <Route exact path="/workouts" element={<Workouts />} />
            <Route exact path="/Exercises/:userID/:exercisename" element={<Exercise />} />
            <Route exact path="/dashboard/:userID" element={<Celula />} />
            <Route exact path="/dashboard/:userID/:MaquinaNames" element={<Maquina />} />
            <Route path='*' element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </GlobalState>
  );
}
export default App;
