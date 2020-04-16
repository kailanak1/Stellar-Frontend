import React from 'react'
import {api} from '../services/api'

export default class EditForm extends React.Component {
    
componentDidMount() {
  console.log(this.props)
}

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
            <input type='date' placeholder={this.props.current.date.slice(5).concat(this.props.current.date.slice(0,4))} name='date' defaultValue={this.props.date}/>
            <br></br>
            <br></br>
            <label>Time of event</label>
            <br></br>
            <input type='text' placeholder={this.props.current.time} name='time'/><br></br>
            <br></br>
            <label>Title / Name</label><br></br>
            <input type='text' placeholder={this.props.current.title} name='title'/><br></br><br></br>
            <label>Any Details?</label><br></br>
            <input type='textarea' name='details' placehold={this.props.current.details}/><br></br><br></br>
            
            <input type="submit" ></input>
        </form>
      </div>
    )
  }

}