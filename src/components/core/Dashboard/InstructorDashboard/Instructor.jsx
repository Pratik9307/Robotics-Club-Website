import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import './Instructor.css'; // Import custom CSS

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="instructor-container">
      <div className="greeting-section">
        <h1 className="greeting-title">Hi {user?.firstName} 👋</h1>
        <p className="greeting-subtitle">Let's start something new</p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="chart-section">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="no-data">
                <p className="no-data-title">Visualize</p>
                <p className="no-data-subtitle">Not Enough Data To Visualize</p>
              </div>
            )}
            <div className="statistics-section">
              <p className="statistics-title">Statistics</p>
              <div className="statistics-content">
                <div>
                  <p>Total Courses</p>
                  <p className="statistics-number">{courses.length}</p>
                </div>
                <div>
                  <p>Total Students</p>
                  <p className="statistics-number">{totalStudents}</p>
                </div>
                <div>
                  <p>Total Income</p>
                  <p className="statistics-number">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="courses-section">
            <div className="courses-header">
              <p>Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="view-all-link">View All</p>
              </Link>
            </div>
            <div className="courses-list">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="course-card">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="course-image"
                  />
                  <div className="course-details">
                    <p className="course-name">{course.courseName}</p>
                    <div className="course-info">
                      <p>{course.studentsEnroled.length} students</p>
                      <p>|</p>
                      <p>Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-courses">
          <p className="no-courses-title">You have not created any courses yet</p>
          <Link to="/dashboard/add-course">
            <p className="create-course-link">Create a course</p>
          </Link>
        </div>
      )}
    </div>
  );
}
