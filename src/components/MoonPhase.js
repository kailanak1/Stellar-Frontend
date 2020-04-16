import React from 'react'
import { api } from '../services/api'

export default class MoonPhase extends React.Component {
    constructor() {
      super()
      this.state = {
        moonPhase: []
      }
    }
  
    componentDidMount() {
        api.moonPhase.getMoonPhase(Math.round((new Date()).getTime() / 1000))
        .then(data =>{
            this.setState({
                moonPhase: data[0]
            })
        })
    }

    handleOnClick = () => {
      
      this.postMoonPhase()
    
    }
    
    onDateClick = (day) => {
      const newSelect = day.toISOString().slice(0,10)
      this.setState({
        selectedDate: newSelect,
      });
    };
  
    postMoonPhase = (event) => {
      let moonEvent = {
        title: this.state.moonPhase.Phase, 
        date: this.state.UTCtime, 
        time: this.state.UTCtime, 
        details: null, 
        user_id: this.props.user.id
      }
      fetch("http://localhost:3000/api/v1/events",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        }, 
        body: JSON.stringify(moonEvent)
      })
      .then(resp => resp.json())
      .then(data => 
        console.log(data))
      }

    renderMoonPhase = () => {
      let moon = this.state.moonPhase
        return (
          <div className="flex-container">
            <div className="left-column">
                <div
                    className="ui card"
                    key={moon.Index}
                    style={{color: "white"}}
                >
                    <div className="content">
                    <div className="header">
                        <span style={{fontSize: "30px"}}>{moon.Moon} </span><br></br>
                    </div>

                    <div className="meta text-wrap">
                        <h3>Phase: {moon.Phase}</h3>
                        <h4>Illumination: {moon.Illumination * 100}%</h4>
                        <h4>Moon Age: {moon.Age} days</h4>
                        <h4>Moon's Distance to Earth: {moon.Distance} km</h4>
                        <h4>Moon's Distance to Sun: {moon.DistanceToSun} km</h4>
                        <h4>Moon Angle: {moon.AngularDiameter}</h4>
                        <h4>Sun Angle: {moon.SunAngularDiameter}</h4>
                      {!!localStorage.token ? <button onClick={this.handleOnClick} className="home-buttons">Add to my calendar</button> : null}
                    <br></br>
                </div>
            </div>
          </div>
        </div>
        <div className="right-column">
        <br></br><br></br>
          <img src="https://www.moonconnection.com/images/moon_phases_diagram.jpg" alt="lunar cycle"></img>
        </div>
      </div>
        )
    }
  
    render(){
      console.log(this.props)
      return (
        <div>
          <h2 style={{color: "white"}}>Tonight's Moon</h2>
          {this.renderMoonPhase()}
        </div>
        )
      }
  }