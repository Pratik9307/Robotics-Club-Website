import RenderSteps from "./RenderSteps";
import "./index.css"

export default function AddCourse() {
  return (
    <>
      <div className="course-container">
        <div className="content-container">
          <h1 className="heading">Add Course</h1>
          <div className="steps-wrapper">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="course-tips">
          <p className="tips-title">⚡ Course Upload Tips</p>
          <ul className="tips-list">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
