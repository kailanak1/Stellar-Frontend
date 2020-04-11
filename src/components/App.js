import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import EventCalendar from './Calender'


function App() {

//all the methods




  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Welcome to Stellar
        </h3>
      </header>
      <Router>
        <Route path='/calendar' component={EventCalendar}
      </Router>
    </div>
  );
}

export default App;
