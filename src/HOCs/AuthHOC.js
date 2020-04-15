import React, {Fragment} from "react"
import { Redirect } from 'react-router-dom'
import {api} from "../services/api"

const AuthHOC = WrappedComponent => {
    console.log(WrappedComponent)

  return class AuthHOC extends React.Component {

    state = {
        authorized: false,
        responseCollected: false
    }

    componentDidMount(){
        this.checkLogin()
    }

    checkLogin = () => {
        if (!localStorage.getItem("token")) {
            console.log("login chain 1")
            this.props.history.push("/login")
        } else {
            api.auth.getCurrentUser().then(resp => {
                if (resp.error){
                    this.props.history.push("/login")
                } else {
                    console.log("got down the check login chain")
                    this.setState({
                        authorized: true
                    }) 
                }
            })
        }
    }

    isAuthorized = () => {
        return this.state.authorized 
    }

    // isRejected = () => {
    //     console.log("is rejecting")
    //     console.log(this.state)
    //     return !this.state.authorized && this.state.responseCollection
    // }


    render(){
      return (
      <div>
          {this.isAuthorized() ? (
          <WrappedComponent {...this.props}/> 
          ): (
            <Redirect to="/login"/> 
          )}
        </div>     
      )
    }
}

export default AuthHOC;

//now need to apply this to all components that need to be private