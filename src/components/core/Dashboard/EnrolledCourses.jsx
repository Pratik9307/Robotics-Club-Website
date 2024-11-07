import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import "./EnrolledCourses.css"; // Import the CSS file

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="enrolled-courses-container">
      <div className="heading">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="no-courses">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="courses-list">
          {/* Headings */}
          <div className="course-header">
            <p className="course-name-header">Course Name</p>
            <p className="duration-header">Duration</p>
            <p className="progress-header">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`course-item ${
                i === arr.length - 1 ? "last-course" : ""
              }`}
              key={i}
            >
              <div
                className="course-details"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="course-image"
                />
                <div className="course-text">
                  <p className="course-title">{course.courseName}</p>
                  <p className="course-description">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="course-duration">{course?.totalDuration}</div>
              <div className="course-progress">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
