import { createContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const context = createContext();

export const ContextProvider = (props) => {
  // const [email, setEmail] = useState("")
   const [contacts, setContacts] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]);
  const navigate = useNavigate();

  // ----------posting signin -------------------

  const signInUser =async(loginData)=>{
    await axios.post("https://contact-manager-backend-g1ec.onrender.com/login", loginData)
      .then((res) => {
        console.log(res.data.token);
        if (res.data.message === "success") {
          localStorage.setItem("token", res.data.token)
          alert("signin Sucessull!")
          navigate("/contacts");
          document.location.reload();
        }
        if (res.data.message === "Unregistered") {
          alert("User not Registered !")
        }
        if (res.data.message === "Invalid") {
          alert("Invalid Crediential!")
        }
      })
      .catch(err => { console.log(err) })
  }

  //-----------signup-------------

  const signUpUser = (userData)=>{
    
    axios.post("https://contact-manager-backend-g1ec.onrender.com/signUp",userData)
      .then((res) => {
        alert(res.data.message);
        navigate("/")
      })
      
      .catch(e => console.log(e))
  }
  
//---------------------------------

  // -----------posting contacts -----------------
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      token:token
    },
  };

  const postContacts = async (contactdata) => {
    console.log(contactdata);
    console.log(token);
    return await axios
      .post("https://contact-manager-backend-g1ec.onrender.com/api/v1/contacts",contactdata,config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message)
        // console.log(err)
      })
  }


  // -------------fetching the contacts----------;

  const fetchContacts = () => {
    axios
      .get("https://contact-manager-backend-g1ec.onrender.com/api/v1/contacts",config)
      .then((res) => {
        //console.log(res.data.users);
      //   const data = res.data.message[0].Contacts;
      //  const data = res.data[0].contact;
        setContacts(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    
    fetchContacts()
  },[]);


  
  

  // // *************deleting contacts*********

  const deleteContacts=(id)=>{
    console.log("======> "+id);
    axios
      .delete(`https://contact-manager-backend-g1ec.onrender.com/api/v1/contacts/${id}`,config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }




 
  // *************serching function ***************

  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };



  return (
    <context.Provider
      // value={
      //   {
      //     contacts,
      //     postContacts,
      //     signUpUser,
      //     signInUser,
      //     email,
      //     fetchContacts,
      //     deleteContacts,
      //     checkedArr,
      //     setCheckedArr,
      //     myFunction
      //   }
      // }
      value ={
        {signInUser,
          signUpUser,
          postContacts,
          contacts,
          fetchContacts,
          deleteContacts, 
          checkedArr,
          setCheckedArr,
          myFunction
        }
      }
      >
      {props.children}
    </context.Provider>
  )
}