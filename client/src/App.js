import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from "./component/Home";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import SignupEmail from "./component/SignupEmail";
import './App.scss';

function App(props) {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => {
            return <Home />
          }} />
          <Route path="/signin" render={() => {
            return <Signin />
          }} />
          <Route path="/signup" render={() => {
            return <Signup />
          }} />
          <Route path="/signupwithemail" render={() => {
            return <SignupEmail />
          }} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
