import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Maquina.css";
import GridMaquina from "../../components/GridMaquina/GridMaquina";

function Maquina() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  //const { userID } = useParams();
  const location = useLocation();
  if (!location.state) window.location.href = "/dashboard";

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Dasboard">
      <Navbar CurrentPage="Máquina">
        <GridMaquina />
      </Navbar>
    </Sidebar>
  );
}
export default Maquina;
