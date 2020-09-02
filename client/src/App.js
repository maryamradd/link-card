import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddLink from "./components/AddLink";
import UserLinkCard from "./components/UserLinkCard";
import Footer from "./components/Footer";
import UserLinks from "./components/UserLinks";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/links" component={UserLinks} />
          <Route exact path="/add" component={AddLink} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/:username" component={UserLinkCard} />
        </Switch>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
