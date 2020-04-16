import React from 'react'
import { api } from '../services/api'

export default class MoonPhase extends React.Component {
    constructor() {
      super()
      this.state = {
        moonPhase: [],
        UNIXTime: Math.round((new Date()).getTime() / 1000)
      }
    }
  
    changeDate = (event) => {
      this.setState({
        UNIXTime: Math.round((new Date(event.target.value)).getTime() / 1000)
      }, ()=> {
        this.componentDidMount()
      })
    }
    componentDidMount() {
      api.moonPhase.getMoonPhase(this.state.UNIXTime)
      .then(data =>{
          this.setState({
              moonPhase: data[0]
          })
      })
    }

    handleOnClick = () => {  
      this.postMoonPhase()
      this.props.history.push('/events')
    }


    
  
    postMoonPhase = () => {

      let date_input = (new Date(this.state.UNIXTime * 1000))
      let time = date_input.toString().split(' ')[4]
      let day = date_input.getDate() + 1;
      if (day.toString().length === 1 ){
        day = `0${date_input.getDate() + 1}`
      }
      let month = date_input.getMonth() + 1;
      if (month.toString().length === 1 ){
        month = `0${date_input.getMonth() + 1}`
      }
      let year = date_input.getFullYear();
      let yyyy_MM_dd = year + "-" + month + "-" + day
      let moonEvent = {
        title: this.state.moonPhase.Phase, 
        date: yyyy_MM_dd, 
        time: time, 
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
     
      return (
        <div>
          <h2 style={{color: "white"}}>Moon Phase</h2>
          {this.renderMoonPhase()}
          <form>
            <label style={{color: "white", fontSize: "20px"}}>Choose a date to see the moon's phase:</label><br></br>
            <input onChange={(event) => this.changeDate(event)} type="date" defaultValue={new Date()} name="date" ></input>
          </form>
        </div>
        )
      }
  }