import React from "react";
import { Link } from "react-router-dom";

const  UserEvent = ({ userevent }) => {
  return (
    <div>
      <div className="ui card">
        <div className="image">
          <img src={userevent.image} alt={userevent.slug} />
        </div>
        <div className="content">
          <div className="header">{userevent.title}</div>
          <div className="meta">{userevent.date}</div>
          <div className="meta">{userevent.time}</div>
          <div className="description">
            <p>Remember: {userevent.notes}</p>
          </div>
        </div>
        <div className="extra content">{/*Anything else we want to add?*/ null}</div>
      </div>
      <Link to="/calendar" className="ui primary button">
        <i className="left arrow icon" />
        Back
      </Link>
    </div>
  );
};

export default UserEvent;