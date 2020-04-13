import React from 'react'
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
      {this.getPic()}
    return(
        <div style={{backgroundImage: background}}>
            <img src={this.state.background} alt="starry sky " width="100%"/>
        Photo by <a href={this.state.profileLink}>{this.state.photographer}</a> on <a href="https://unsplash.com/?utm_source=Stellar&utm_medium=referral">Unsplash</a>
        </div>
    )
  }
}
export default LandingPage

