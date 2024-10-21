import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/SettingsAPI"; 
import IconBtn from "../../../common/IconBtn";
import "./UpdatePassword.css";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
      reset();
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="password-update-wrapper">
      <form onSubmit={handleSubmit(submitPasswordForm)} className="password-update-form">
        <h2 className="password-update-title">Update Password</h2>
        
        {/* Current Password */}
        <div className="form-group password-input-container">
          <label htmlFor="oldPassword" className="form-label">
            Current Password
          </label>
          <div className="input-with-icon">
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="input-field1"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="icon-toggle"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </div>
          {errors.oldPassword && (
            <p className="error-text">Please enter your Current Password.</p>
          )}
        </div>

        {/* New Password */}
        <div className="form-group password-input-container">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <div className="input-with-icon">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="input-field1"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="icon-toggle"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </div>
          {errors.newPassword && (
            <p className="error-text">Please enter your New Password.</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="form-group password-input-container">
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm New Password
          </label>
          <div className="input-with-icon">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              className="input-field1"
              {...register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />
            <span
              onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              className="icon-toggle"
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </div>
          {errors.confirmNewPassword && (
            <p className="error-text">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        {/* Button Group */}
        <div className="button-group">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="button cancel-button"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" className="submit-button" />
        </div>
      </form>
    </div>
  );
}
