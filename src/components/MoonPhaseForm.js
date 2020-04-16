import React from 'react'
import {api} from '../services/api'

export default class EditForm extends React.Component{


render(){
    return(
<div id="EventForm">
<form id="event-form" onSubmit={this.handleSubmit}>
    <label>Event Date</label><br></br>
    <input onChange={this.handleChange} type='date' placeholder={this.props.date} name='date' defaultValue={this.props.date}/>
    <br></br>
    <br></br>
    <label>Time of event</label>
    <br></br>
    <input type='text' placeholder={!!this.props.time ? this.props.time : '7pm'} name='time'/><br></br>
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