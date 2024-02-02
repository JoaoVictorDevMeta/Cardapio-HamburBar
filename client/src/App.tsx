import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";

import './App.scss';
import PrivateRoute from "./hooks/PrivateRoute";
import PostItem from "./pages/post/PostItem";
import EditItem from "./pages/edit/EditItem";

function App() {

  return (
    <div className="App">
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/postitem" element={<PostItem/>}/>
        <Route path="/edititem/:id" element={<EditItem/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App
