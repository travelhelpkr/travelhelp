import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import SignupEmail from './SignupEmail';

function Signup() {

  return(
    <div>
      <h1>Sign Up</h1>
      <div>
        <a href="/signupwithemail">Sign Up with an Email</a>
      </div>
      <div>
        <a href="/signupwithemail">Sign Up with Google</a>
      </div>
      <div>
        <a href="/signupwithemail">Sign Up with WeChat</a>
      </div>
      <div>
        <a href="/signupwithemail">Sign Up with WeChat</a>
      </div>
      <div>
        <a href="/signin">You already have ID?</a>
      </div>
    </div>
  )
}

export default withRouter(Signup);