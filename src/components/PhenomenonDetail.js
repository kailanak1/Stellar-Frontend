import React from 'react'

const PhenomenonDetail = props => {
    const { phenomenon } = props

  return (
    <div style={{color:'white'}} className="ui column">

      <div
        style={{width: '40%', border: '1px solid white', margin: 'auto'}}
        key={phenomenon.id}
        onClick={null/*show detailed specs*/}
      >
        <div className="content">
          <div className="header">
            <span style={{fontSize: "30px"}}>{phenomenon.Event} </span><br></br>
          </div>

          <div className="meta text-wrap">
            <h3>{phenomenon.Month} {phenomenon.Date}, at {phenomenon.LocalTime}</h3>
          </div>
        </div>
        <br></br>
      </div>
      <br></br>
    </div>
  );

};

export default PhenomenonDetail;