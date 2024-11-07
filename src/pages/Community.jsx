import React from 'react';
import Navbar from '../components/Navbar';
import CM1 from "../images/CM1.jpg";
import CM2 from "../images/CM2.jpg";
import CM3 from "../images/CM3.jpg";
import CM4 from "../images/CM4.jpg";
import CM5 from "../images/CM5.jpg";
import CM6 from "../images/CM6.jpg";
import F1 from "../images/F1.jpg";
import F2 from "../images/F2.jpg";
import F3 from "../images/F3.jpg";
import F4 from "../images/F4.jpg";
import F5 from "../images/F5.jpg";
import F6 from "../images/F6.jpg";
import F7 from "../images/F7.jpg";
import F8 from "../images/F8.jpg";
import F9 from "../images/F9.jpg";
import F11 from "../images/F11.jpg";
import F13 from "../images/F13.jpg";
import F12 from "../images/F12.jpg";
import F14 from "../images/F14.jpg";
import './Community.css';
import Footer from '../components/Footer';
const Community = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div className='wrapper'>
       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <div className='CM'>
        <div className='imgCM'>
          <img src={CM1} alt="Community 1" />
        </div>
        <div className='imgCM'>
          <img src={CM2} alt="Community 2" />
        </div>
        <div className='imgCM'>
          <img src={CM3} alt="Community 3" />
        </div>
        <div className='imgCM'>
          <img src={CM4} alt="Community 4" />
        </div>
        <div className='imgCM'>
          <img src={CM5} alt="Community 5" />
        </div>
        <div className='imgCM'>
          <img src={CM6} alt="Community 6" />
        </div>
      </div>

      <div className='Inauguration'>
        <h1 className='Robotics-Title'>
          "Launching the Future: Robotics Club Grand Opening"
        </h1>
        <div>
          <img src={F1} alt="Inauguration 1" />
        </div>
        <div>
          <img src={F2} alt="Inauguration 2" />
        </div>
        <div>
          <img src={F3} alt="Inauguration 3" />
        </div>
        <div>
          <img src={F4} alt="Inauguration 4" />
        </div>
        <div>
          <img src={F5} alt="Inauguration 5" />
        </div>
        <div>
          <img src={F6} alt="Inauguration 6" />
        </div>
        <div>
          <img src={F7} alt="Inauguration 7" />
        </div>
        <div>
          <img src={F8} alt="Inauguration 8" />
        </div>
        <div>
          <img src={F9} alt="Inauguration 9" />
        </div>
        
        <div>
          <img src={F11} alt="Inauguration 11" />
        </div>
        <div>
          <img src={F12} alt="Inauguration 12" />
        </div>
        <div>
          <img src={F13} alt="Inauguration 13" />
        </div>
        <div>
          <img src={F14} alt="Inauguration 14" />
        </div>
      </div>
      <div>
    <Footer/>

      </div>
      
    </div>
  );
};

export default Community;
