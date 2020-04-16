import React from 'react'
import {api} from '../services/api'

export default class Signup extends React.Component {
  state = {
    background: ''
  }

componentDidMount() {
  api.photos.getPhotos('galaxy').then(data => {
    this.setState({
      background: data.results[0].urls.regular
    }, () => {
      document.getElementById('html').style.background = `url(${this.state.background}) no-repeat center center fixed`
      document.getElementById('html').style.backgroundSize = 'cover'
    })
  })
}

handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreateUser(event);
    event.target.name.value = ''
    event.target.username.value = ''
    event.target.password.value = ''
    this.props.history.push('/calendar')

}

render(){
    
    return (  
      <div id="signup">
        {this.props.appState.errors ? <h3 style={{color: 'white'}}>Error! This username has already been taken. Please try again.</h3> : <h3>Enter the information below to create an account.</h3>}
        <form id="event-form" onSubmit={this.handleSubmit}>
            <label>Name</label><br></br>
            <input type='text' placeholder="name" name='name'/><br></br><label>Username</label><br></br>
            <input type='text' placeholder='username' name='username'/>
            <br></br>
            <br></br>
            <label>Password</label>
            <br></br>
            <input type='password' placeholder='password' name='password'/><br></br>
            <br></br>
            <br></br>
            <input type="submit" ></input>
        </form>
      </div>
    )
  }

}