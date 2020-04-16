import React from 'react'
import { api } from '../services/api'
import ConstellationDetail from './ConstellationDetails'

export default class ConstellationList extends React.Component {
  constructor() {
    super()
    this.state = {
      constellations: []
    }
  }

  componentDidMount() {
    api.constellations.getConstellations().then(data => {
      this.setState({
        constellations: data
    })
  })
  }

  renderConstellations = () => {
    return this.state.constellations.map(star => {
      return <ConstellationDetail key={star.id} star={star}/>
    })
  }


  render(){
    return (
      <div style={{color:'white'}}>
        <h2>Constellations Galore</h2>
        <div style={{width: '50%'}}>
        {this.renderConstellations()}
        </div>
      </div>
      )
    }
}