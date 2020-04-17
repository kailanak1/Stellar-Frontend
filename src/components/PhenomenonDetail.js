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
        console.log(data))
    }
  


  return (
    <div style={{color:'white'}} className="ui column">
      <div
        className="ui card"
        key={phenomenon.id}
        onClick={null/*show detailed specs*/}
      >
        <div className="content">
          <div className="header">
            <span style={{fontSize: "30px"}}>{phenomenon.Event} </span><br></br>
          </div>

          <div className="meta text-wrap">
            <h4>{phenomenon.Month} {phenomenon.Date}, at {phenomenon.LocalTime}</h4>
           <button className="button" onClick={handleClick} >Add Event to Calendar</button>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );

}


export default PhenomenonDetail;