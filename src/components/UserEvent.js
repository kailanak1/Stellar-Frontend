import React from "react";
import AuthHOC from "../HOCs/AuthHOC";
import { api } from '../services/api'
import EditForm from './EditForm'

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
    events: [],
    form: false,
    list: true,
    currentEvent: {}
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
    if (this.state.list == true) {
      if (this.state.events.length == 0){
        return <h3>You have no events on your calendar yet.</h3>
      } else {
        let i=1
        return this.state.events.map(event => {
          return (<div>
                    {!!event.title ? <h3>{i}. {event.title[0].toUpperCase() + event.title.slice(1)}</h3> : <h3>[Untitled Event]</h3>}

                    {!!event.date ?
                    <p>{`${months[event.date.slice(5,7)]} ${event.date.slice(8,10)}, ${event.date.slice(0,4)}`} at {event.time}<br></br>
                    <span style={{display:'none'}}>{i++}</span>
                    Things to Remember: {event.details}</p> : null}

                    <button onClick={() => this.editEvent({event})}>Edit Event</button>&emsp;<button onClick={() => this.deleteEvent({event})}>Delete Event</button>
                    <br></br>
                  </div>
                  )
        })
      }
    }
  }

  editEvent = (e) => {
    this.setState(prev=> {
      return {
      form: !prev.form,
      list: !prev.list,
      currentEvent: e
      } 
    }, () => this.showForm())
  }

  goBack = () => {
    this.setState(prev => {
      return {
        form: !prev.form,
        list: !prev.list
      }
    }, () => {
    this.props.history.push('/events')})
  }

  postEdit = (event) => {
    let editedEvent = {
        title: event.target.title.value,
        date: event.target.date.value,
        time: event.target.time.value,
        details: event.target.details.value,
        user_id: this.props.user.id
      }
      fetch(`http://localhost:3000/api/v1/edit_event/${this.state.currentEvent.event.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        }, 
        body: JSON.stringify(editedEvent)
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState(prev => {
          return {
            form: !prev.form,
            list: !prev.list
          }
      })})
      this.props.history.push('/events')
    }

  deleteEvent = (e) => {
    this.setState(prev=> {
      return {
      currentEvent: e
      } 
    }, () => {
      fetch(`http://localhost:3000/api/v1/events/${this.state.currentEvent.event.id}`, {
          method: "DELETE"
        })
        .then(resp => {
          this.setState({
            currentEvent: {}
          })
        })
        })
      this.props.history.push('/calendar')
  }


  showForm = () => {
    if (this.state.form === true) {
      return <EditForm {...this.props} current={this.state.currentEvent.event} style={{display: "block"}} editEvent={this.postEdit} show={this.state.form} />
    } else {
      return <EditForm {...this.props} current={this.state.currentEvent.event} editEvent={this.postEdit} show={this.state.form} style={{display:'none'}}/>}
  }

  render() {
    return (
      <div className="events">
        <h2>My Events:</h2>
        {this.renderEvents()}
        {this.showForm()}
      </div>
    );
  }

};

export default AuthHOC(UserEvent);