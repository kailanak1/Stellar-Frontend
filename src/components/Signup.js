import React from 'react'

export default class Signup extends React.Component {
    
componentDidMount() {
    console.log(this.props.show)
}

handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreateUser(event);
}

render(){
    
    return (  
      <div id="signup">
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