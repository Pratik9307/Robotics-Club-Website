import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import "./RenderSteps.css"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="steps-container">
        {steps.map((item) => (
          <>
            <div className="step-item" key={item.id}>
              <button
                className={`step-button ${
                  step === item.id ? "active" : ""
                } ${step > item.id ? "completed" : ""}`}
              >
                {step > item.id ? (
                  <FaCheck className="check-icon" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <div className={`step-line ${step > item.id ? "filled" : ""}`} />
            )}
          </>
        ))}
      </div>

      <div className="step-titles">
        {steps.map((item) => (
          <div className="step-title-item" key={item.id}>
            <p className={`step-title ${step >= item.id ? "active" : ""}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
