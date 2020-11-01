import React from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Luggage(props) {

  // change language handler
  const { t } = useTranslation();


  return(
    <div className="background">

    </div>
  )
}

export default withRouter(Luggage);