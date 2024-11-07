import React from 'react'
import "./About.css"
import Navbar from '../components/Navbar';
import SDVedio from "../Vedio/.mp4";
import ImageSlider2 from '../slider/ImageSlider2';
import Footer from '../components/Footer';
import { useRef } from 'react';


 const About = ({isLoggedIn, setIsLoggedIn}) => {

   
   const videoRef = useRef(null);
   const handleVideoEnd = () => {
     if (videoRef.current) {
       videoRef.current.play();
     }
   };
  return (
    <div className='Wrapper1'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
       <div className='data-container'>
           <div className='header-container'>
             <h1>Learn Robotics with Online / Offline Courses</h1>
           </div>
               <div className='info-container'>
                   <h1 className='info-header'>Information About Robotics & Automation</h1>
                       <p className='info-text'>This area of engineering uses multiple disciplines to design, build, 
                          program and use robots. Robots are programmable machines that use sensors 
                          and actuators to interact with the physical world and perform actions autonomously
                          or semi-autonomously. Because they can be reprogrammed, robots are more flexible 
                          than single-function machines. Collaborative robots are designed to complete tasks in 
                          a similar manner to humans, while traditional industrial robots tend to complete tasks 
                          more efficiently than humans.</p>
                       <p className='info-text'>
                          Industrial automation and robotics are the use of computers, control systems and 
                          information technology to handle industrial processes and machinery, replacing manual 
                          labour and improving efficiency, speed, quality and performance.
                       </p>
                </div>
          </div>

          <div className='wrap1'>
            <div className='vedio-wrapper'>
            <video
                className='vedio'
                src={SDVedio}
                autoPlay
                muted
                loop={false} 
                ref={videoRef}
                onEnded={handleVideoEnd}
      />

         </div>
             <div className='slider2'>
             <ImageSlider2/>
            </div>
         </div>

         <div>
          
         </div>
         <div className='footer'>
            <Footer/>
         </div>
      
    </div>
  )
} 
export default About;
