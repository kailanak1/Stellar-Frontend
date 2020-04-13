import React from 'react'

export default class EventForm extends React.Component {
    
componentDidMount() {
    console.log(this.props.date)
}

render(){
    //receive props from CALENDAR SELECTION
        const dateSelection = `${this.props.month} ${this.props.date}`

    return (
      <div id="EventForm">
        <form id="event-form">
            <label>Event Date</label>
            <input type='text' placeholder={dateSelection} name='date'/>
            <label>Time of event</label>
            <input type='text' placeholder={'7pm'} name='time'/>
            <label>Title / Name</label>
            <input type='text' placeholder={'meteor shower'} name='title'/>
            <label>Any Details?</label>
            <input type='textarea' name='details'/>
        </form>
      </div>
    )
  }

}