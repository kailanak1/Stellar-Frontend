import React from "react";
import { Link } from "react-router-dom";
import AuthHOC from '../HOCs/AuthHOC'

const  UserEvent = ({ userevent }) => {
  return (
    <div>
      hello {userevent}
    </div>
  );
};

export default AuthHOC(UserEvent);