import React from 'react'
import {Link} from 'react-router-dom'
import { api } from "../services/api";

let background
let url
let photographer
let profileLink
class LandingPage extends React.Component{
    constructor() {
        super ()
        this.state = {
            background: ''
        }
    }

    componentDidMount(){
      api.photos.getPhotos('galaxy').then(data => {
        this.setState({
          background: data.results[3].urls.regular
        }, () => {
          document.getElementById('html').style.background = `url(${this.state.background}) no-repeat center center fixed`
          document.getElementById('html').style.backgroundSize = 'cover'
        })
      })
    }

  render(){
    
    return(
      <div className="flex-container">
        <h1 className="wrapper message left-column" style={{position:"relative", top: "200px"}}>
          Welcome to Stellar
        </h1>
        <div className="right-column wrapper message" style={{position:"relative", top: "200px"}}>
            <Link to="/login" >
                <small style={{color: "white"}}>For existing users:</small>
                <br></br>
                <button className="home-buttons">Log In</button> 
                <br></br>
                <br></br>

            </Link>
            <Link to="/signup" >
                <small style={{color: "white"}}>New to Stellar?</small>
                <br></br>
                <button className="home-buttons">Sign Up</button> 
                <br></br>
            </Link>
        </div>
        
      </div>
    )
  }
}

export default LandingPage

