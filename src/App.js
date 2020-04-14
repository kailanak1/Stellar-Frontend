import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { api } from "./services/api";
import ConstellationList from './components/ConstellationList'
import Calendar from './components/Calender.jsx'
import './calendar.css'
import LandingPage from './components/LandingPage'
import UserEvent from './components/UserEvent'
import Signup from './components/Signup'

let myPhoto;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {id: '', username: ''}
      },
      photo: ""
    };
  }

  
//all the methods
componentDidMount() {
  const token = localStorage.getItem("token");
  // if (token) {
  //   // make a request to the backend and find our user
  //   api.auth.getCurrentUser().then(user => {
  //     const updatedState = { ...this.state.auth, user: user };
  //     this.setState({ auth: updatedState });
  //   });
  // }
}

// calendar: (api.auth.getCalendars().then(cals => {return cals.find(user_id => user_id == data.id) }))

login = data => {
  const updatedState = { ...this.state.auth, user: {id: data.user.id,  username: data.user.username}};
  localStorage.setItem("token", data.jwt);
  this.setState({ 
    auth: updatedState });
};

logout = () => {
  localStorage.removeItem("token");
  this.setState({ auth: { user: {} } });
};

addEvent = (event) => {
  console.log("you're going to a party")
  let newEvent = {
    title: event.target.title.value,
    date: event.target.date.value,
    time: event.target.time.value,
    details: event.target.details.value,
    calendar_id: this.state.auth.user.calendar.id,
    user_id: this.state.auth.user.id
  }
  fetch("http://localhost:3000/api/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    }, 
    body: JSON.stringify(newEvent)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
  }

createUser = (event) => {
  console.log(event)
}
  //User and user's calendar are identified
  //Association is created
  //Added to user's event list
  //Event view / detail is created?
  //Little event bar comes up on the calendar day


render() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
        <Navbar user={this.state.auth.user}/>
        </header>
        <div className = "main">
          <Route
            exact
            path="/login"
            render={props => <Login {...props} onLogin={this.login} />}/>

          <Route
            exact
            path="/signup"
            render={props => <Signup {...props} onCreateUser={this.createUser} />}/>

          <Route path="/constellations" component={ConstellationList} />

          <Route 
            exact
            path='/calendar' 
            render={props => <Calendar {...props} user={this.state.auth.user} onAddEvent={this.addEvent}/>} />

          <Route 
            exact
            path='/event' 
            render={props => <UserEvent {...props} onAddEvent={this.addEvent}/>} />  
            
          <Route
            exact
            path="/"
            render={props => <LandingPage {...props}/>}
          />     
        </div>
        </Router>
    </div>
  );
}

}

