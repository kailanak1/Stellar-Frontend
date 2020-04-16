import React from 'react'
import {api} from '../services/api'

export default class EditForm extends React.Component {
    

handleSubmit = (event) => {
    event.preventDefault();
    this.props.editEvent(event);
    event.target.time.value = ''
    event.target.title.value = ''
    event.target.details.value = ''
    this.props.history.push('/events')
}


render(){
    return (
        !this.props.show ? <div></div> :  
      <div id="EventForm">
        <form id="event-form" onSubmit={this.handleSubmit}>
            <label>Event Date</label><br></br>
            <input type='date' placeholder={this.props.current.date.slice(5).concat(this.props.current.date.slice(0,4))} name='date' defaultValue={this.props.current.date}/>
            <br></br>
            <br></br>
            <label>Time of event</label>
            <br></br>
            <input type='text' defaultValue={this.props.current.time} name='time'/><br></br>
            <br></br>
            <label>Title / Name</label><br></br>
            <input type='text' defaultValue={this.props.current.title} name='title'/><br></br><br></br>
            <label>Any Details?</label><br></br>
            <input type='textarea' name='details' defaultValue={this.props.current.details}/><br></br><br></br>
            
            <button onClick={this.props.goBack}>Back</button>&emsp;<input type="submit" ></input>
            <br></br>
        </form>
        <br></br>
      </div>
    )
  }

}