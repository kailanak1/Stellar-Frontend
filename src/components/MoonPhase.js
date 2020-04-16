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
                        <h3>Phase: {moon.Phase}</h3>
                    </div>

                    <div style={{border:"1px solid white", width: '95%', margin: 'auto'}}>
                        <h4>Illumination: {moon.Illumination * 100}%</h4>
                        <h4>Moon Age: {moon.Age} days</h4>
                        <h4>Moon's Distance to Earth: {moon.Distance} km</h4>
                        <h4>Moon's Distance to Sun: {moon.DistanceToSun} km</h4>
                        <h4>Moon Angle: {moon.AngularDiameter}</h4>
                        <h4>Sun Angle: {moon.SunAngularDiameter}</h4>
                    <br></br>
                </div>
            </div>
          </div>
        </div>
        <div className="right-column" style={{width: "45%"}}>
        <br></br><br></br>
          <img src="https://www.moonconnection.com/images/moon_phases_diagram.jpg" alt="lunar cycle"></img>
        </div>
      </div>
        )
    }

  
    render(){
      return (
        <div>
          <h2 style={{color: "white"}}>Today's Moon</h2>
          {this.renderMoonPhase()}
        </div>
        )
      }
  }