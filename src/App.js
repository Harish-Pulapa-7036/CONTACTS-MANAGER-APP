//import NavBar from "./navbar/navbar";
import Header from "./Components/Header/header";
import Login from "./Components/Login_component/Login";
import Signup from "./Components/SignUP_component/signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ContextProvider } from './Components/Context/Context';
const token = localStorage.getItem("token");

function App() {
  return (
    <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path='/contacts' element={
           token ? (<Header />) : (<Navigate replace to={"/"} />)
          } />
      </Routes>
    </ContextProvider>
  </BrowserRouter>
  );
}

export default App;
