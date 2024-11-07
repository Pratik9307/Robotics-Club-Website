import React from 'react';
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
import Home from '../pages/Home';


const LoadingPage = () => {
  return (
    <div>
    <Link to='/'>
       <Navbar/>
    </Link>
    <Home/>

    
        
    
    
   
      
        
       
      
    </div>
  )
}
export default LoadingPage;
