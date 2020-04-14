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
  
  getPic = () => {
      api.photos.getPhotos('constellations').then(data => {
    background = data.results[Math.floor(Math.random())*data.results.length].urls.regular;
   profileLink = data.results[Math.floor(Math.random())*data.results.length].links.name
   photographer = data.results[Math.floor(Math.random())*data.results.length].user.name
    this.setState({
        background: background,
        photographer: photographer,
        profileLink: profileLink

    })
})
}

// componentDidMount() {
//     this.getPic();  
// }

  render(){
    //   {this.getPic()}
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
        {/* <div style={{backgroundImage: background}}>
            <img src={this.state.background} alt="starry sky " width="100%"/>
        Photo by <a href={this.state.profileLink}>{this.state.photographer}</a> on <a href="https://unsplash.com/?utm_source=Stellar&utm_medium=referral">Unsplash</a>
        </div> */}
      </div>
    )
  }
}

export default LandingPage

