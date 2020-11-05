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
import EmailVerification from "./component/EmailVerification";
import './App.scss';

function App(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if(window.sessionStorage.getItem('email')) {
      setIsLogin(true);
      setEmail(window.sessionStorage.getItem('email'));
      setName(window.sessionStorage.getItem('name'));
    }
  })

  const Nav = () => {
    if(window.sessionStorage.getItem('email')) {
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
            if(window.sessionStorage.getItem("email")){
              return <Redirect to='/' />
            } else {
              return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId}/>
            }
          }} />
          <Route path="/user/signup" render={() => {
            return <Signup />
          }} />
          <Route path="/user/mypage" render={() => {
            if(window.sessionStorage.getItem("email")){
              return <Mypage setIsLogin={setIsLogin} name={name} email={email} setEmail={setEmail} setName={setName} />
            } else {
              return <Redirect to='/user/signin' />
            }
          }} />
          <Route path="/user/emailVerified" render={() => {
            return <EmailVerification />
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
