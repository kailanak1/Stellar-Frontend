import React from 'react'

export default class EventForm extends React.Component {
    
componentDidMount() {
    console.log(this.props.show)
}

handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddEvent(event);
}

render(){
    //receive props from CALENDAR SELECTION
    const dateSelection = this.props.day
    
    return (
        !this.props.show ? <div></div> :  
      <div id="EventForm">
        <form id="event-form" onSubmit={this.handleSubmit}>
            <label>Event Date</label><br></br>
            <input type='text' placeholder={this.props.date} name='date'/>
            <br></br>
            <br></br>
            <label>Time of event</label>
            <br></br>
            <input type='text' placeholder={'7pm'} name='time'/><br></br>
            <br></br>
            <label>Title / Name</label><br></br>
            <input type='text' placeholder={'meteor shower'} name='title'/><br></br><br></br>
            <label>Any Details?</label><br></br>
            <input type='textarea' name='details'/><br></br><br></br>
            <input type="submit" ></input>
        </form>
      </div>
    )
  }

}