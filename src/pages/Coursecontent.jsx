import React from 'react';
import './Coursecontent.css';
import noDataImage from '../assets/Cartoon.jpg'; 

const Coursecontent = ({ Courses1 }) => {
  return (
    <div className="course-container">
      <div className="courses-content">
        {Courses1 && Courses1.length > 0 ? (
          <div className="courses-grid">
            {Courses1.map((course) => (
              <div className="card" key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.Disc}</p>
                <p>{course.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <img src={noDataImage} alt="No Data Found" className="no-data-image" />
            <h2>No data available</h2>
            <p>There is no data available at the moment. Please check again later!</p>
            <button className="btn-reload" onClick={() => window.location.reload()}>Reload</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coursecontent;
