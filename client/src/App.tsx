import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";

import './App.scss';

function App() {

  return (
    <div className="App">
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
