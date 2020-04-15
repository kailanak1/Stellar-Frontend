import React from 'react'
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {


  render(){
    const link = {
      width: '70px',
      hieght: '30px',
      fontSize: "20px",
      fontFamily: 'Playfair Display cursive',
      fontStyle: 'oblique', 
      textDecoration: 'none',
      padding: '10px',
      margin: '0 6px 6px',
      background: 'purple',
      color: 'white',
    }

    return (
      <div className="navbar">
        
      <NavLink
        to="/constellations"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}
        >Constellations</NavLink>

      {!this.props.user ? null : <NavLink 
        to="/phenomena"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}>Sky Phenomena</NavLink> }

        {!this.props.user ? <NavLink
        to="/login"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}
        >Log In</NavLink> : <NavLink 
        to="/calendar"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}>My Calendar</NavLink> }

      {!localStorage.getItem("token") ? <NavLink
        to="/"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}
        >Home</NavLink> : <NavLink 
        to="/events"
        exact
        style={link}
        activeStyle={{
          background: 'black'
        }}>My Events</NavLink> }

        {!!localStorage.getItem("token") == ''}
        <NavLink
        to="/"
        exact
        style={link}
        onClick={this.props.logout}
        >Logout</NavLink> 

    </div>
  );
}
}