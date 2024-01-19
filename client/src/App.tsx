import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";

import './App.scss';
import PrivateRoute from "./hooks/PrivateRoute";

function App() {

  return (
    <div className="App">
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App
