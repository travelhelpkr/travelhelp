import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './component/Home';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Mypage from './component/Mypage';
import FoodDelivery from './component/FoodDelivery';
import Luggage from './component/Luggage';
import Taxi from './component/Taxi';
import Rental from './component/Rental';
import NavMypage from './component/NavMypage';
import NavSignin from './component/NavSignin';
import EmailVerification from './component/EmailVerification';
import ResetPassword from './component/ResetPassword';
import FoodChicken from './component/FoodChicken';
import FoodNoodle from './component/FoodNoodle';
import Cart from './component/Cart';
import VerifyEmail from './component/VerifyEmail';
import './App.scss';

function App(props) {

  // user state
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  // check state of signin
  useEffect(() => {
    if(window.sessionStorage.getItem('name')) {
      setIsLogin(true);
      setUserId(window.sessionStorage.getItem('id'));
      setEmail(window.sessionStorage.getItem('email'));
      setName(window.sessionStorage.getItem('name'));
    }
  })
  
  // check state of signin by federation login
  useEffect(() => {
    if(Cookies.get('user')) {
      // get userCookie obj when oAuth sign in through federation login
      const userCookie = JSON.parse(Cookies.get('user').slice(Cookies.get('user').indexOf('{')));
      window.localStorage.setItem('i18nextLng', userCookie.language);
      window.sessionStorage.setItem('id', userCookie.id);
      window.sessionStorage.setItem('email', userCookie.email);
      window.sessionStorage.setItem('name', userCookie.name);
      setIsLogin(true);
      setUserId(window.sessionStorage.getItem('id'));
      setEmail(window.sessionStorage.getItem('email'));
      setName(window.sessionStorage.getItem('name'));
    }
  })

  // change navigation bar depends on signin status
  const Nav = () => {
    if(window.sessionStorage.getItem('id')) {
      return <NavMypage />
    } else {
      return <NavSignin />
    }
  }

  return (
    <div className='App'>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => {
            return <Home />
          }} />
          <Route path='/user/signin' render={() => {
            if(window.sessionStorage.getItem('id')){
              return <Redirect to='/' />
            } else {
              return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId}/>
            }
          }} />
          <Route path='/user/signup' render={() => {
            return <Signup />
          }} />
          <Route path='/user/mypage' render={() => {
            if(window.sessionStorage.getItem('id')){
              return <Mypage setIsLogin={setIsLogin} name={name} email={email} setEmail={setEmail} setName={setName} />
            } else {
              return <Redirect to='/user/signin' />
            }
          }} />
          <Route path='/user/emailVerified' render={() => {
            return <EmailVerification />
          }} />
          <Route path='/user/resetPassword' render={() => {
            return <ResetPassword />
          }} />
          <Route path='/user/cart' render={() => {
            return <Cart userId={userId} />
          }} />
          <Route path='/user/verifyEmail' render={() => {
            return <VerifyEmail />
          }} />
          <Route path='/help/foodDelivery' render={() => {
            return <FoodDelivery userId={userId} />
          }} />
          <Route path='/help/foodDelivery/chicken' render={() => {
            return <FoodChicken userId={userId} />
          }} />
          <Route path='/help/foodDelivery/noodle' render={() => {
            return <FoodNoodle  userId={userId} />
          }} />
          <Route path='/help/luggage' render={() => {
            return <Luggage />
          }} />
          <Route path='/help/taxi' render={() => {
            return <Taxi />
          }} />
          <Route path='/help/rental' render={() => {
            return <Rental />
          }} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
