import React from 'react'

const ConstellationDetail = props => {
    const { star } = props

  return (
    <div className="ui column" style={{border: "1px, solid", white: ''}}>
      <div
        className="ui card"
        key={star.id}
        onClick={null/*show detailed specs*/}
      >
        <div className="content">
          <div className="header">
            <span style={{fontSize: "30px"}}>{star.Name} </span> ({star.Abbr}) <br></br>
            <small>{star.Pronunciation}</small>
          </div>

          <div className="meta text-wrap">
            <h5>" {star.Meaning} "</h5>
          </div>
        </div>
        <div className="extra content">
          <span>
            {star.Area} (in sq°).
          </span>

          <span>
          Number of stars on the 100 Brightest Stars list: {star.S}
        Best date for viewing (constellation is on or very near the meridian at midnight): {star.Date}
          </span>
          <span>
            {star.V == "V" || star.V == "P" ? "Visible from where you are!" : "Not visible."}
          </span>
          <br></br>
        </div>
        <br></br>
      </div>
    </div>
  );

};

export default ConstellationDetail;
