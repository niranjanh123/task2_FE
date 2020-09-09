import React from "react";
import "./App.css";
import Check from "./components/Sub_Components/check";
import Update from "./components/Sub_Components/update";
import Register from "./components/Register";
import About from "./components/About";
import Login from "./components/Login";
import Main from "./components/Main";
import Profile from "./components/Sub_Components/Profile";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact strict component={Register} />

        <Route path="/home" exact strict component={Register} />

        <Route path="/about" exact strict component={About} />

        <Route path="/login" exact strict component={Login} />

        <Route path="/main" exact strict component={Main} />

        <Route path="/check" exact strict component={Check} />
        <Route path="/update" exact strict component={Update} />
        <Route path="/destroy" exact strict component={Login} />
        <Route path="/logout" exact strict component={Login}></Route>
        <Route path="/profile" exact strict component={Profile}></Route>
      </div>
    </Router>
  );
}

export default App;
