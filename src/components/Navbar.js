import React from 'react'
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {


  render(){
    const link = {
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
      <div className="navbar" style={{alignItems: 'center', marginTop: '10px'}}>
        
      <NavLink className='link'
        to="/constellations"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}
        >Constellations</NavLink>

      <NavLink className='link'
        to="/moonphase"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}
        >Moon Phase</NavLink>

      {!localStorage.getItem("token") ? null : <NavLink className='link'
        to="/phenomena"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}>Sky Phenomena</NavLink> }

        {!localStorage.getItem("token") ? <NavLink className='link'
        to="/login"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}
        >Log In</NavLink> : <NavLink className='link'
        to="/calendar"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}>My Calendar</NavLink> }

      {!localStorage.getItem("token") ? <NavLink className='link'
        to="/"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}
        >Home</NavLink> : <NavLink className='link'
        to="/events"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}>My Events</NavLink> }

        {!!localStorage.getItem("token") ?
        <NavLink className='link'
        to="/"
        exact
        style={link}
        activeStyle={{
          background: 'rgba(71, 3, 114, 0.836)'
        }}
        onClick={this.props.logout}
        >Logout</NavLink> : null}

    </div>
  );
}
}