import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {

  // get url
  const url = new URL(window.location.href);

  // send token to server
  useEffect(() => {
    axios.get('https://travelhelp.kr/api/auth/email', {
      params: {
        token: url.searchParams.get('token') 
      }
    })
    .then(() => window.location = '/user/signin');
  })

  return(
    <div>

    </div>
  )

}

export default withRouter(VerifyEmail); 