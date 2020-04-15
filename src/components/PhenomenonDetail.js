import React from 'react'
import AuthHOC from '../HOCs/AuthHOC'

const PhenomenonDetail = props => {
    const { phenomenon } = props

  return (
    <div className="ui column">
      <div
        className="ui card"
        key={phenomenon.id}
        onClick={null/*show detailed specs*/}
      >
        <div className="content">
          <div className="header">
            <span style={{fontSize: "30px"}}>{phenomenon.Event} </span><br></br>
          </div>

          <div className="meta text-wrap">
            <h4>{phenomenon.Month} {phenomenon.Date}, at {phenomenon.LocalTime}</h4>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );

};

export default AuthHOC(PhenomenonDetail);