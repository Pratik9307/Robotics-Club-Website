import React from 'react';
import "./Courses.css";
import Card from '../Cards/Card';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const Courses = ({ Courses1, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className='CardWrapper'>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className='Card-map'>
        {Courses1.map((Course) => {
          return (
            <Card
              key={Course.id}
              {...Course}
              isLoggedIn={isLoggedIn} // Pass the isLoggedIn prop to each Card
            />
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
