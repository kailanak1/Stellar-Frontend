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

let myPhoto;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {}
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
  // api.photos.getPhotos('constellations')
  // .then(data => {
  //   console.log(data)
  // })
}

login = data => {
  const updatedState = { ...this.state.auth, user: {id: data.id,  username: data.username} };
  localStorage.setItem("token", data.jwt);
  this.setState({ auth: updatedState });
};

logout = () => {
  localStorage.removeItem("token");
  this.setState({ auth: { user: {} } });
};

render() {
  return (
    <div className="App">
       <header className="App-header">
      </header>
      {/* <Navbar/> */}
      <h3>
          Welcome to Stellar
      </h3>

      <main>
        <div className="row">
          <div className="column">
            <div className="left-column">
              left column
        </div>
        </div> 
        <div className="column">
        <div className="right-column">
               

      <div className="ui container grid">
         <Router>
          <div id="content" className="sixteen wide column">
              <Route
                exact
                path="/login"
                render={props => <Login {...props} onLogin={this.login} />}/>

              <Route path="/constellations" component={ConstellationList} />

              <Route 
                exact
                path='/calendar' 
                render={props => <Calendar />} />
                
              <Route
                exact
                path="/home"
                render={props => <LandingPage {...props}/>}
              />     
          </div>
        </Router>
        </div>
              </div>
              </div>
        </div>
        </main>
    </div>
  );
}

}

