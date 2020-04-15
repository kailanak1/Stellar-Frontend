import React from 'react'

export default class Signup extends React.Component {


handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreateUser(event);
    event.target.name.value = ''
    event.target.username.value = ''
    event.target.password.value = ''

}

render(){
    
    return (  
      <div id="signup">
        {this.props.appState.errors ? <h3 style={{color: 'white'}}>Error! This username has already been taken. Please try again.</h3> : null}
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