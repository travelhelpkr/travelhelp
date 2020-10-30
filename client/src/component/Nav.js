import React from "react";
import { withRouter } from "react-router-dom";
import './Home.scss';

function Nav(props) {


  return(
    <div className="background">
      <div className="nav">
        {/* title */}
        <a href="/" className="homeTitle">Travel Help</a>
      </div>

    </div>
  )
}

export default Nav; 