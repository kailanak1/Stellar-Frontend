import React from "react";
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import isSameDay from 'date-fns/isSameDay'
import startOfWeek from 'date-fns/startOfWeek'
import '../calendar.css'
import EventForm from './AddEvent'
import AuthHOC from '../HOCs/AuthHOC'
import {api} from '../services/api'


class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    form: false,
    existingEvents: []
  };

  componentDidMount(){
    api.events.getEvents().then(data => {
      this.setState(prev => {
        return {
          existingEvents: data.filter(event => event.user_id == this.props.user.id).map(e => e.date),
          selectedDate: prev.selectedDate.toISOString().slice(0,10)
        }
      })
    })
    document.getElementById('html').style.background = `url(https://images.unsplash.com/photo-1529935978887-ce06dc5fa8fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60) no-repeat center center fixed`
        document.getElementById('html').style.backgroundSize = 'cover'
  }

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    // let existingEvents = []
    // if (!!this.props.user.events) {
    //   existingEvents = this.props.events.map(event =>
    //     event.date)
    // }

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const checkSelect = day.toISOString().slice(0,10)
        days.push(
          <div
            className={`col cell ${
              !checkSelect == selectedDate ? "disabled"
                : checkSelect === selectedDate ? "selected" : ''}`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {this.state.existingEvents.length == 0 ? ""
                : this.state.existingEvents.includes(checkSelect) ? <h5 className="evented">Your Stellar Event!</h5> : null }
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    const newSelect = day.toISOString().slice(0,10)
    this.setState({
      selectedDate: newSelect,
    });
  };

  updateDate = (day) => {
    this.setState({
      selectedDate: day,
    });
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  handleClick = () => {
    //USER LOGGED IN??
    if (!!localStorage.token) {
      this.setState(prev => {
        return {
          form: !prev.form
        }
      })
    }
    else {
      this.props.history.push('/login')
    }
  }

  showForm = () => {
    if (this.state.form === true) {
      return <EventForm {...this.props} updateDate={this.updateDate} onAddEvent={this.props.onAddEvent} style={{display: "block"}} show={this.state.form} date={this.state.selectedDate}/>
    } else {
      return <EventForm updateDate={this.updateDate} date={this.state.selectedDate} onAddEvent={this.props.onAddEvent} show={this.state.form} style={{display:'none'}}/>}
  }


  render() {
    return (
      <div className="flex-container">
        <div className="left-column" style={{width:'60%'}}>
          <h1 style={{color:'white', fontSize:'40px'}}>My Calendar</h1>
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
          <br></br>
          <input className="home-buttons" style={{background:'purple'}} type="button" onClick={this.handleClick} value="Add Event"></input>
          </div>

          <div className="right-column" style={{width:'35%'}}>
          {this.showForm()}
          </div>
        </div>
    )
  }
}

export default AuthHOC(Calendar);

