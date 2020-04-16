import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { api } from "./services/api";
import ConstellationList from './components/ConstellationList'
import Phenomena from './components/Phenomena'
import Calendar from './components/Calender.jsx'
import MoonPhase from './components/MoonPhase'
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
        user: {}
      }
    };
  }

  
//all the methods
componentDidMount() {
  const token = localStorage.getItem("token");
  if (token) {
    // make a request to the backend and find our user
    api.auth.getCurrentUser().then(user => {
      const updatedState = { user };
      this.setState({ auth: updatedState });
    });
  }
}

// calendar: (api.auth.getCalendars().then(cals => {return cals.find(user_id => user_id == data.id) }))

login = data => {
  const updatedState = { user: {id: data.user.id,  username: data.user.username}};
  console.log(updatedState)
  localStorage.setItem("token", data.jwt);
  this.setState({ 
    auth: updatedState
  });
};

logout = () => {
  localStorage.removeItem("token");
  this.setState({
    auth: { user: {} },
    errors: null,
    events: []
  });
};

addEvent = (event) => {
  let newEvent = {
    title: event.target.title.value,
    date: event.target.date.value,
    time: event.target.time.value,
    details: event.target.details.value,
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
  .then(data => 
    console.log(data))
  }
  //Added to user's event list (should be automatic through ActiveRecord association)
  //Event view / detail is created?
  //Little event bar comes up on the calendar day


createUser = (event) => {
  let newUser = {
    avatar: event.target.name.value,
    username: event.target.username.value,
    password: event.target.password.value,
  }
  api.auth.createUser(newUser).then(res => {
    console.log(res)
     if (!!res.user.id){
        this.login(res);
        this.setState({errors: false})
        //NEED TO REDIRECT
    } else {
        this.setState({errors: true})
    }
})
}


render() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
        <h1 style={{margin: '5px', paddingLeft: '10px', paddingTop: '5px'}}>Stellar</h1>
        <Navbar className='navbar' logout={this.logout} user={this.state.auth.user}/>
        </header>
        <div >
          <Route
            exact
            path="/login"
            render={props => <Login {...props} onLogin={this.login} />}/>

          <Route
            exact
            path="/signup"
            render={props => <Signup {...props} appState={this.state} onCreateUser={this.createUser} />}/>

          <Route path="/constellations" component={ConstellationList} />

          <Route path="/moonphase" component={MoonPhase} />

          <Route 
            exact
            path='/calendar' 
            render={props => <Calendar {...props} user={this.state.auth.user} onAddEvent={this.addEvent}/>} />

          <Route 
            exact
            path='/events' 
            render={props => <UserEvent {...props} user={this.state.auth.user} />} />  
  
          <Route 
            exact
            path="/phenomena"
            component={Phenomena} />
    
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

