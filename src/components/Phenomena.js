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
    }
    
    renderPhenomena = () => {
        return this.state.phenomena.map(phenomenon => {
            return <PhenomenonDetail key={phenomenon.id} phenomenon={phenomenon} user={this.props.user}/>
        })
    }

    render(){
   
        return (
          <div style={{color:'white'}}>
            <h2>Phenomena</h2>
            {this.renderPhenomena()}
          </div>
        )
    }

}