import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { checkemail, checklicense, getCurrentUserRole, logout } from "../../firebase";
import logo from './assets/images/Esi-branco.svg'
import { MdLogout, MdOutlineAreaChart, MdManageAccounts, MdGroups, MdGroupAdd, MdOutlineEditCalendar } from "react-icons/md";
import { useEffect, useState } from "react";

const Sidebar = ({ParentPage,children}) => {

    const hoverIcon = ParentPage;
    console.log( hoverIcon)
    const [SeeAllUsers , SetSeeAllUsers] = useState(false);
    const [AddUserStandard, SetAddUserStandard] = useState(false);
    let SeeAllUsersComponent = null;
    let AddUserStandardComponent = null;

    useEffect(() =>{
        checkemail().then((result) => {
            if (result === false) {
              navigate("/signupemail");
            }
        });
        checklicense().then((result) => {
            if (result === true) {
              navigate("/OTP");
            }
        });

        getCurrentUserRole((role) =>{
            console.log(role)
            if(role === "admin"){
                SetSeeAllUsers(true);
                SetAddUserStandard(true);
            }
            else if(role === "leader") {
                SetAddUserStandard(true);
            }
        });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();
    const goDash = () =>{  
      navigate("/dashboard");
    }
    const goConta = () =>{  
      navigate("/account");
    }
/*     const goDefinicoes = () =>{  
        navigate("/definicoes");
    } */
    const goClientes = () =>{  
        navigate("/users");
    }
    const goSignupUser = () =>{  
        navigate("/funcionarios");
    }
    const goAgenda = () => {
        navigate("/agenda");
    }
    
    if (SeeAllUsers) {
        SeeAllUsersComponent =                     
        <li className={`sidebar2-item ${hoverIcon === "Clientes" ? 'sidebar2-linkAtualPage' : ''}`}>
            <a href="#top" className="sidebar2-link" onClick={goClientes}>
                <MdGroups size={40}/>
                <span className="link-text">USERS</span>
            </a>
        </li>
    }
   
    if (AddUserStandard) {
        AddUserStandardComponent =                     
        <li className={`sidebar2-item ${hoverIcon === "Funcionários" ? 'sidebar2-linkAtualPage' : ''}`}>
            <a href="#top" className="sidebar2-link" onClick={goSignupUser}>
                <MdGroupAdd size={40}/>
                <span className="link-text">Exercícios</span>
            </a>
        </li>
    }

    return(
        <div>
            
            <nav className="sidebar2">
                <ul className="sidebar2-nav">
                    <li className="sidebar2-logo">
                        <a href="#top" id="SB2" onClick={goDash}>  
                        <img src={logo} alt="Logo" className='icon' height = "50"  />
                        </a>
                    </li>

                    <li className={`sidebar2-item ${hoverIcon === "Dashboard" ? 'sidebar2-linkAtualPage' : ''}`}>
                        <a href="#top" className="sidebar2-link" onClick={goDash}>
                            <MdOutlineAreaChart size={40}/> 
                            <span className="link-text">Info & Stats</span>
                        </a>
                    </li>

                    <li className={`sidebar2-item ${hoverIcon === "Conta" ? 'sidebar2-linkAtualPage' : ''}`}>
                        <a href="#top" className="sidebar2-link" onClick={goConta}>
                            <MdManageAccounts size={40}/> 
                            <span className="link-text">EU</span>
                        </a>
                    </li>

                    <li className={`sidebar2-item ${hoverIcon === "Agenda" ? 'sidebar2-linkAtualPage' : ''}`}>
                        <a href="#top" className="sidebar2-link" onClick={goAgenda}>
                            <MdOutlineEditCalendar size={40}/>
                            <span className="link-text">Agenda</span>
                        </a>
                    </li>

                    {SeeAllUsersComponent}
                    
                    {AddUserStandardComponent}

                    <li className="sidebar2-item">
                        <a href="#top" className="sidebar2-link" onClick={logout}>
                            <MdLogout size={40}/> 
                            <span className="link-text">SAIR</span>
                        </a>
                    </li>
                </ul>
            </nav>
            

            <section className="home-section2">
                <main>{children}</main>
            </section>
        </div>
    );
}
export default Sidebar;