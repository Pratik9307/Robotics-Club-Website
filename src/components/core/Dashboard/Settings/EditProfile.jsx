import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import "./EditProfile.css"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];


export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className="edit-profile-form">

     <h2 className="profile-info-title">Profile Information</h2>
      {/* Profile Information */}
      <div className="profile-info-container">
       
        <div className="profile-fields">
          <div className="field-group">
            <label htmlFor="firstName" className="label-style">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              className="input-style"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="error-message">Please enter your first name.</span>
            )}
          </div>
          <div className="field-group">
            <label htmlFor="lastName" className="label-style">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="input-style"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="error-message">Please enter your last name.</span>
            )}
          </div>
        </div>

        <div className="profile-fields">
          <div className="field-group">
            <label htmlFor="dateOfBirth" className="label-style">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="input-style"
              {...register("dateOfBirth", {
                required: { value: true, message: "Please enter your Date of Birth." },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="error-message">{errors.dateOfBirth.message}</span>
            )}
          </div>
          <div className="field-group">
            <label htmlFor="gender" className="label-style">Gender</label>
            <select
              name="gender"
              id="gender"
              className="input-style"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((gender, index) => (
                <option key={index} value={gender}>{gender}</option>
              ))}
            </select>
            {errors.gender && (
              <span className="error-message">Please select your gender.</span>
            )}
          </div>
        </div>

        <div className="profile-fields">
          <div className="field-group">
            <label htmlFor="contactNumber" className="label-style">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="input-style"
              {...register("contactNumber", {
                required: { value: true, message: "Please enter your Contact Number." },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="error-message">{errors.contactNumber.message}</span>
            )}
          </div>
          <div className="field-group">
            <label htmlFor="about" className="label-style">About</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="input-style"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="error-message">Please enter your About.</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="cancel-button"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  );
}
