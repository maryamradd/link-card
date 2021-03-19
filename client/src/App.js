import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import Home from "./components/ui/Home";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";
import AddLink from "./components//links/AddLink";
import Footer from "./components/shared/Footer";
import UserLinks from "./components/links/UserLinks";
import Profile from "./components/ui/Profile";
import EditLink from "./components/links/EditLink";
import Settings from "./components/ui/Settings";
import AuthenticatedRoute from "./services/auth/AuthenticatedRoute";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <AuthenticatedRoute exact path="/settings" component={Settings} />
          <AuthenticatedRoute exact path="/links" component={UserLinks} />
          <AuthenticatedRoute exact path="/add" component={AddLink} />
          <AuthenticatedRoute
            exact
            path="/editLink/:linkId"
            component={EditLink}
          />
          <AuthenticatedRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
