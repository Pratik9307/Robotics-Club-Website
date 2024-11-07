import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import "./CourseDetails.css"; // Import your custom CSS file

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!response.success) {
    return <Error />;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="course-details-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="thumbnail-container">
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="thumbnail"
              />
            </div>
            <div className="details">
              <h1 className="course-title">{courseName}</h1>
              <p className="course-description">{courseDescription}</p>
              <div className="course-meta">
                <span className="rating">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <p className="instructor-info">
                Created By {`${instructor.firstName} ${instructor.lastName}`}
              </p>
              <div className="additional-info">
                <p className="created-at">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="language">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="buy-buttons">
              <p className="price">Rs. {price}</p>
              <button className="yellow-button" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="black-button">Add to Cart</button>
            </div>
          </div>
          <div className="sidebar">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
        <div className="what-you-will-learn">
          <h2>What you'll learn</h2>
          <div className="markdown-content">
            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
          </div>
        </div>
        <div className="course-content-section">
          <h2>Course Content</h2>
          <div className="content-info">
            <span>{courseContent.length} section(s)</span>
            <span>{totalNoOfLectures} lecture(s)</span>
            <span>{response.data?.totalDuration} total length</span>
            <button
              className="collapse-button"
              onClick={() => setIsActive([])}
            >
              Collapse all sections
            </button>
          </div>
          <div className="accordion-container">
            {courseContent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>
          <div className="author-details">
            <h2>Author</h2>
            <div className="author-info">
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Author"
                className="author-image"
              />
              <p className="author-name">
                {`${instructor.firstName} ${instructor.lastName}`}
              </p>
            </div>
            <p className="author-bio">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
