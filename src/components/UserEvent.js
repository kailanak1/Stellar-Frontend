import React from "react";
import AuthHOC from "../HOCs/AuthHOC";
import { api } from '../services/api'

const months = {
  '01': "JAN",
  '02': "FEB",
  '03': "MAR",
  '04': "APR",
  '05': "MAY",
  '06': "JUN",
  '07': "JUL",
  '08': "AUG",
  '09': "SEP",
  '10': "OCT",
  '11': "NOV", 
  '12': "DEC" }

class UserEvent extends React.Component{
  constructor(){
    super();
    this.state = {
    events: []
    }
  }

  componentDidMount(){
    api.events.getEvents().then(data => {
      this.setState({
        events: data.filter(event => event.user_id == this.props.user.id)
    })
  })
}

  renderEvents = () => {
      if (this.state.events.length == 0){
        return <h3>You have no events on your calendar yet.</h3>
      } else {
        let i=1
        return this.state.events.map(event => {
          return (<div>
                    <h3>{i}. {event.title[0].toUpperCase() + event.title.slice(1)}</h3>
                    <p>{`${months[event.date.slice(5,7)]} ${event.date.slice(8,10)}, ${event.date.slice(0,4)}`} at {event.time}<br></br>
                    {i++}
                    Things to Remember: {event.details}</p><br></br>
                  </div>
                  )
        })
      }
  }

  render() {
    return (
      <div className="events">
        <h2>My Events:</h2>
        {this.renderEvents()}
      </div>
    );
  }
};

export default AuthHOC(UserEvent);