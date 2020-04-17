import React from 'react'

const PhenomenonDetail = props => {
    const { phenomenon } = props

    const handleClick = () => {
   
      const months = {
        'January': "01",
        'February': "02",
        'March': "03",
        'April': "04",
        'May': "05",
        'June': "06",
        'July': "07",
        'August': "08",
        'September': "09",
        'October': "10",
        'November': "11", 
        'December': "12" }
        
      let date = {
        year: new Date().getFullYear(),
        month: months[phenomenon.Month],
        day: phenomenon.Date
      }
      if (phenomenon.Date.toString().length === 1 ){
        date.day = `0${phenomenon.Date}`
      }
      
      let phenomEvent = {
        title: phenomenon.Event, 
        date: `${date.year}-${date.month}-${date.day}`, 
        time: phenomenon.LocalTime, 
        details: null, 
        user_id: props.user.id
      }
      fetch("http://localhost:3000/api/v1/events",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        }, 
        body: JSON.stringify(phenomEvent)
      })
      .then(resp => resp.json())
      .then(data => 
        props.history.push('/events'))
    }

  return (
    <div style={{color:'white'}} className="ui column">

      <div
        style={{width: '45%', border: '1px solid white', margin: 'auto'}}
        key={phenomenon.id}
      >
        <div className="content">
          <div className="header">
            <span style={{fontSize: "28px"}}>{phenomenon.Event} </span><br></br>
          </div>

          <div className="meta text-wrap">
            <h3>{phenomenon.Month} {phenomenon.Date}, at {phenomenon.LocalTime}</h3>
            <button className="page-button" onClick={handleClick} >Add Event to Calendar</button>
            <br></br>
          </div>
        </div>
        <br></br>
      </div>
      <br></br>
    </div>
  );

};

export default PhenomenonDetail;