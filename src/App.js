import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { api } from "./services/api";
import ConstellationList from './components/ConstellationList'
import Phenomena from './components/Phenomena'
import Calendar from './components/Calender.jsx'
import './calendar.css'
import LandingPage from './components/LandingPage'
import UserEvent from './components/UserEvent'

let myPhoto;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {id: 1, calendar: {id:1}}
      },
      photo: ""
    };
  }

  
//all the methods
componentDidMount() {
  const token = localStorage.getItem("token");
  //console.log(token)
  if (token) {
    // make a request to the backend and find our user
    api.auth.getCurrentUser().then(user => {
      // console.log(user)
      const updatedState = { ...this.state.auth, user: user };
      this.setState({ auth: updatedState });
    });
  }
  // api.phenomena.getPhenomena().then(data => {console.log(data)})
  // api.moonPhase.getMoonPhase(Math.round((new Date()).getTime() / 1000)).then(data =>{console.log(data)})
}

login = data => {
  const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username, calendar: (api.auth.getCalendars().then(data => {return data.find_by({user_id: data.id}) }))}};
  localStorage.setItem("token", data.jwt);
  this.setState({ auth: updatedState });
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

          <Route path="/constellations" component={ConstellationList} />

          <Route 
            exact
            path='/calendar' 
            render={props => <Calendar {...props} onAddEvent={this.addEvent}/>} />

          <Route 
            exact
            path='/event' 
            render={props => <UserEvent {...props} onAddEvent={this.addEvent}/>} />  
   
              <Route path="/phenomena" component={Phenomena} />
    
              <Route
                exact
                path="/"
                render={props => <LandingPage {...props}/>}
              />     
          </div>
        </div>
        </Router>
    </div>
  );
}

}

