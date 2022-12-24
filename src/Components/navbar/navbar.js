import "./navbar.css"
import Dashboard from "./images/Dashboard.jpg"
import total from "./images/total.png"
import logout from "./images/logout_vector.png"
import { useNavigate } from "react-router-dom";

const NavBar = ()=>{
    const navigate = useNavigate()
    return(
        <main>

            <div className="side-bar">

                <div className="sideBar-container">
                    <div className="sideBar-heading">
                        <h1>Logo</h1>
                    </div>

                    <div className="dashboard">
                        <img src={Dashboard} alt="dashboard" />
                        <p>Dashboard</p>
                    </div>

                    <div className="total-contacts">
                        <img src={total} alt="totalContact" id="contact-img" />
                        <p>Total contacts</p>
                    </div>

                </div>

                <div className="logout-container">
                    <img src={logout} alt="logout" id="logout-img" />
                    <p onClick={() => {
                         localStorage.removeItem("token");
                         navigate("/")
                        document.location.reload();
                    }}>Log Out</p>
                </div>
            </div>

        </main>
    )
}

export default NavBar;