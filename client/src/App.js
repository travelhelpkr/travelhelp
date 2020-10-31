import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import Nav from "./component/Nav";
import Home from "./component/Home";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Mypage from "./component/Mypage";
import FoodDelivery from "./component/FoodDelivery";
import Luggage from "./component/Luggage";
import Taxi from "./component/Taxi";
import Rental from "./component/Rental";
import NavMypage from "./component/NavMypage";
import NavSignin from "./component/NavSignin";
import './App.scss';

function App(props) {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(window.sessionStorage.getItem('id')) {
      setIsLogin(true);
    }
  })

  const Nav = () => {
    if(window.sessionStorage.getItem('id')) {
      return <NavMypage />
    } else {
      return <NavSignin />
    }
  }

  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => {
            return <Home />
          }} />
          <Route path="/user/signin" render={() => {
            if(window.sessionStorage.getItem("id")){
              return <Redirect to='/' />
            } else {
              return <Signin setIsLogin={setIsLogin}/>
            }
          }} />
          <Route path="/user/signup" render={() => {
            return <Signup />
          }} />
          <Route path="/user/mypage" render={() => {
            return <Mypage />
          }} />
          <Route path="/help/foodDelivery" render={() => {
            return <FoodDelivery />
          }} />
          <Route path="/help/luggage" render={() => {
            return <Luggage />
          }} />
          <Route path="/help/taxi" render={() => {
            return <Taxi />
          }} />
          <Route path="/help/rental" render={() => {
            return <Rental />
          }} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
