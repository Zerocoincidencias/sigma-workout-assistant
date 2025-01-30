import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase";
import Sidebar from "../../components/Sidebar/Sidebar";
//import Navbar from "../../components/Navbar/Navbar";
//import ListCelulas from "../../components/ListCelulas/ListCelulas";
import { FaHeartbeat } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";






function Dashboard() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [BPM,setBPM] = useState("");


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    //alert(user.uid);
    const uid = user.uid;
    const database2 = getDatabase();
    const bpmref = ref(database2,"users/" + uid + "/Sinais/BPM");

    onValue(
      bpmref,
      (snapshot) => {
       setBPM(snapshot.val());
      },
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <Sidebar ParentPage="Dashboard">
        {/*<ListCelulas/> */}
        TRY OUT YOUR MEASURING EQUIPMENT
        ACCESS THE SIGMA WORKOUT ASSISTANT ANDROID APP
        <div className="heartbox">
          <FaHeartbeat size={50} />

          </div>
          <div className="texto2-dado">
            {BPM}
          </div>
    </Sidebar>
  );
}

export default Dashboard;
