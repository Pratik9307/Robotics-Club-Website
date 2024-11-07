import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import './RenderCartCourses.css'; // Link your custom CSS file here

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-courses-container">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`course-item ${indx !== cart.length - 1 ? 'course-item-border' : ''} ${
            indx !== 0 ? 'course-item-spacing' : ''
          }`}
        >
          <div className="course-details">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="course-thumbnail"
            />
            <div className="course-info">
              <p className="course-name">{course?.courseName}</p>
              <p className="course-category">{course?.category?.name}</p>
              <div className="course-rating">
                <span className="rating-value">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="rating-count">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="course-actions">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="remove-course-btn"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="course-price">₹ {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
