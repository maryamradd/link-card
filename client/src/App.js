import React, {useContext} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddLink from "./components/AddLink";
import UserLinkCard from "./components/UserLinkCard";
import Footer from "./components/Footer";
import UserLinks from "./components/UserLinks";
import LinkItem from "./components/LinkItem";

function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/links" component={UserLinks} />
        <Route exact path="/add" component={AddLink} />
        <Route path="/:username" component={UserLinkCard} />
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
