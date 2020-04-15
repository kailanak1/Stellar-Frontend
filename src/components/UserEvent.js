import React from "react";
import AuthHOC from "../HOCs/AuthHOC";
import { api } from '../services/api'

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
        return this.state.events.map(event => {
          return (<li>
                    <h3>{event.title}</h3>
                    <p>{event.date} at {event.time}</p>
                    <p>Notes: {event.details}</p>
                  </li>)
        })
      }
  }

  render() {
    return (
      <div className="events">
        <h2>My Events:</h2>
        <ul>
        {this.renderEvents()}
        </ul>
      </div>
    );
  }
};

export default AuthHOC(UserEvent);