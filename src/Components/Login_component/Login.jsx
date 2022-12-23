import "./login.css"
import { useState,useContext } from "react";
import { context } from "../Context/Context";
//import axios from "axios"
//import { useNavigate } from "react-router-dom";


const Login = () => {
    //const navigator = useNavigate()
    const [login, setlogin] = useState({})
     const { signInUser } = useContext(context);

    const oldUser = async () => {
        if (login.userEmail && login.password) {
            signInUser(login)
        }
        else {
            alert("Input field shouldn't be Empty!")
        }

     }

    return (
        <div id="login-container">
            <section id="top-section">
                <div className="image-box1">
                    <img src={require("./Ellipse-31.png")} alt="" />
                </div>
                <div className="image-box2">
                    <img id="elp1" src={require("./Group-695.png")} alt="" />
                </div>
            </section>
            <section id="middle">
                <h1>Logo</h1>
                <p>Enter your credentials to access your account</p>
                <div>
                    <input className="input" type="text" placeholder="User-Email"
                     onChange={(e) => { setlogin({ ...login, userEmail: e.target.value }) }} 
                     name="userEmail" />
                </div>
                <div>
                    <input className="input" type="password" placeholder="Password"
                     onChange={(e) => { setlogin({ ...login, password: e.target.value }) }} 
                     name="password" />
                </div>
                <div>
                    <button type="submit"
                     onClick={oldUser}
                     >Sign In</button>
                </div>
                <div>
                    <a href="/signUp">sign up</a>
                </div>
            </section>
            <section id="bottom-section">
                <div id="elp2" className="image-box2"><img src={require("./Group-695.png")} alt="" /></div>
                <div id="elp22" className="image-box1"><img src={require("./Ellipse-32.png")} alt="" /></div>
            </section>
        </div>
    )
}

export default Login;