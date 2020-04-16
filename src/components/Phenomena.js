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
        api.photos.getPhotos("galaxy").then(data => {
          this.setState({
            background: data.results[1].urls.regular
          }, () => {
            document.getElementById('html').style.background = `url(${this.state.background}) no-repeat center center fixed`
            document.getElementById('html').style.backgroundSize = 'cover'
          })
        })
    }
    
    renderPhenomena = () => {
        return this.state.phenomena.map(phenomenon => {
            return <PhenomenonDetail key={phenomenon.id} phenomenon={phenomenon}/>
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