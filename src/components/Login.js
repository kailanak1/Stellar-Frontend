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
            if (!res.error){
                this.props.onLogin(res);
                this.props.history.push('/')
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
               {this.state.errors ? <h1>This is an error</h1> : null} 

               <div>
                   <form onSubmit={this.handleSubmit}>
                        <label>Username: </label>
                        <input type="text" name="username" placeholder="username" value={fields.username} onChange={this.handleChange}></input>
                        <label>Password: </label>
                        <input type="password" name="password" placeholder="password" value={fields.password} onChange={this.handleChange}></input>
                        <button type="submit">Log In</button>
                   </form>
                </div>
            </div>
        )
    }





}