import React from 'react'
import { api } from '../services/api'

export default class Login extends React.Component{
    constructor(){
        super()
        
        this.state = {
            errors: false,
            fields: {
                username: "", 
                password: ""
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log("logging in")
        api.auth.login(this.state.fields).then(res => {
            console.log(res)
            if (!res.errors){
                this.props.onLogin(res);
                this.props.history.push('/calendar')
            } else {
                this.setState({errors: true})
            }
        })
    }

    handleChange = (event) => {
        const newState = {...this.state.fields, [event.target.name]: event.target.value}
        this.setState({
                fields: newState
        })      
    }


    render(){
        const {fields} = this.state 
        return (
            <div>
               {this.state.errors ? <h1>Uh-oh, something went wrong... Please try again.</h1> : <br></br>} 
                <br></br>
               <div>
                    <h3 style={{color:'white'}}>Log in for full access to all of Stellar's functionality:</h3>
                   <form onSubmit={this.handleSubmit}>
                        <label>Username: </label><br></br>
                        <input type="text" name="username" placeholder="username" value={fields.username} onChange={this.handleChange}></input><br></br><br></br>
                        <label>Password: </label><br></br>
                        <input type="password" name="password" placeholder="password" value={fields.password} onChange={this.handleChange}></input><br></br><br></br>
                        <button type="submit">Log In</button>
                   </form>
                </div>
            </div>
        )
    }





}