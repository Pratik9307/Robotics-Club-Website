import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";
import "./CourseInformationForm.css"; // Link the custom CSS file

export default function CourseInformationForm() {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, [editCourse, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (editCourse) {
      if (isFormUpdated()) {
        formData.append("courseId", course._id);
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="course-form">
      <div className="form-group">
        <label htmlFor="courseTitle">Course Title <sup>*</sup></label>
        <input id="courseTitle" placeholder="Enter Course Title" {...register("courseTitle", { required: true })} />
        {errors.courseTitle && <span className="error-text">Course title is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="courseShortDesc">Course Short Description <sup>*</sup></label>
        <textarea id="courseShortDesc" placeholder="Enter Description" {...register("courseShortDesc", { required: true })} />
        {errors.courseShortDesc && <span className="error-text">Course Description is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="coursePrice">Course Price <sup>*</sup></label>
        <div className="input-icon">
          <HiOutlineCurrencyRupee />
          <input id="coursePrice" placeholder="Enter Course Price" {...register("coursePrice", { required: true, valueAsNumber: true })} />
        </div>
        {errors.coursePrice && <span className="error-text">Course Price is required</span>}
      </div>

      <div className="form-group">
        <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
        <select {...register("courseCategory", { required: true })} id="courseCategory">
  <option value="" disabled>Choose a Category</option>
  {!loading && courseCategories.length > 0 ? (
    courseCategories.map((category) => (
      <option key={category._id} value={category._id}>{category.name}</option>
    ))
  ) : (
    <option disabled>Loading categories...</option>
  )}
</select>
{errors.courseCategory && <span className="error-text">Course Category is required</span>}

      </div>

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="form-group">
        <label htmlFor="courseBenefits">Benefits of the course <sup>*</sup></label>
        <textarea id="courseBenefits" placeholder="Enter benefits of the course" {...register("courseBenefits", { required: true })} />
        {errors.courseBenefits && <span className="error-text">Benefits of the course is required</span>}
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className="button-group">
        {editCourse && (
          <button type="button" onClick={() => dispatch(setStep(2))} disabled={loading}>Continue Without Saving</button>
        )}
        <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
