import React from 'react'
import "./SimpleDiv.css"
import Robot1 from "../assets/robot.jpg";
import Robot2 from "../assets/robot2.jpg";
import Robot3 from "../assets/Robot3.jpg";
import Robot4 from "../images/img2.jpg";

 const SimpleDiv = () => {
  return (
    <div className='Div-wrapper1'>
     <div className='img-container1'>
        <div className='photo'>
          <img src={Robot1} alt="Robot1" />
          <h2>Capturing Moments</h2>
          <p>Explore the art of capturing life's fleeting moments.</p>
        </div>
        <div className='photo'>
          <img src={Robot2} alt="Robot2" />
          <h2>Lens and Light</h2>
          <p>Dive into the world of light manipulation through lenses.</p>
        </div>
        <div className='photo'>
          <img src={Robot3} alt="Robot3" />
          <h2>Frames of Creativity</h2>
          <p>Unleash your creative potential with stunning frames.</p>
        </div>
        <div className='photo'>
          <img src={Robot4} alt="Mitsubishi AS-100" />
          <h2>Mitsubishi AS-100</h2>
          <p>The Mitsubishi AS-100 robot delivers exceptional precision and reliability for industrial automation.</p>
        </div>
      </div>
     </div>
  )
}
export default SimpleDiv;
