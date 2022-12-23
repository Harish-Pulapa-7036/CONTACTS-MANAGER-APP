import NavBar from "../navbar/navbar";
import Search from "./images/search.png"
import profile from "./images/profile.png"
import {context} from "../Context/Context"
import { useContext } from "react";
import  "./Header.css"

//import Table from "../Tables/table";

import TableNav from "../TableNav/TableNav";

const Header = ()=>{
    const { myFunction } = useContext(context);
    return(
        <div className='main-container'>
            <div className='sideBar'>
                <NavBar/>
            </div>
            <div className='middle-container'>
                <div className='header-container'>
                    <div className='total-contact'>Total Contacts</div>
                    <div className='search'>
                        <img src={Search} alt="" width="20px" />
                        <input type="search"
                            placeholder='Search by Email-Id....'
                            id='myInput'
                             onKeyUp={() => myFunction()}

                        />
                    </div>
                    <div className='user-container'>
                        <div className='user-image'>
                            <img src={profile} alt="user" id="user"/>
                        </div>
                        <div className='user-details'>
                            <p style={{ fontSize: "20px", color: "#000000" }}>
                                user
                            </p>
                            <p className='user-type'>
                                Super Admin
                            </p>
                        </div>
                    </div>
                </div>
                <div className='tableNav-container'>
                  <TableNav/>
                </div>
            </div>
        </div>
    )
}

export default Header;