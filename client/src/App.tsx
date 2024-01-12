import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import './App.scss';

function App() {

  return (
    <div className="App">
    <header>
      <a href="/">
        <h1>HamburBar</h1>
      </a>
    </header>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
