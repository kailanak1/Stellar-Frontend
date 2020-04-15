import React from 'react'
import { api } from '../services/api'
import PhenomenonDetail from './PhenomenonDetail'
import AuthHOC from '../HOCs/AuthHOC'

class Phenomena extends React.Component{
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
            return <PhenomenonDetail key={phenomenon.id} phenomenon={phenomenon}/>
        })
    }

    render(){
        return (
          <div>
            <h2 style={{color: "white"}}>Phenomena</h2>
            {this.renderPhenomena()}
          </div>
        )
    }

}

export default AuthHOC(Phenomena)