import React from 'react'
import { api } from '../services/api'
import PhenomenonDetail from './PhenomenonDetail'

export default class Phenomena extends React.Component{
    constructor() {
        super()
        this.state = {
          phenomena: []
        }
    }
    componentDidMount() {
        api.phenomena.getPhenomena().then(data => {
          this.setState({
            phenomena: data
          })
        })
        document.getElementById('html').style.background = `url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1987&q=80) no-repeat center center fixed`
        document.getElementById('html').style.backgroundSize = 'cover'
    }
    
    renderPhenomena = () => {
        return this.state.phenomena.map(phenomenon => {
            return <PhenomenonDetail {...this.props} key={phenomenon.id} phenomenon={phenomenon} user={this.props.user}/>
        })
    }

    render(){
        return (
          <div style={{color:'white'}}>
            <h2 style={{fontSize: '40px', fontFamily: 'Playfair Display cursive', fontStyle: 'oblique', textDecoration: 'none', margin: 'unset'}}>Phenomena</h2>
            {this.renderPhenomena()}
          </div>
        )
    }

}