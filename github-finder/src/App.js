import React, { Component } from "react";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import GithubState from "./context/github/GithubState";
import User from "./components/users/User";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className='App'>
              <Navbar />
              <div className='container'>
                <Alert />
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/user/:username' element={<User />} />
                  <Route path='*' element={<NotFound />}></Route> //keep this as
                  last route it acts as a default if any route is not found. It
                  matches anything so keep it at the end.
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    );
  }
}

export default App;
