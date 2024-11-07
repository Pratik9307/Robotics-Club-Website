import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import './MyProfile.css'; // Import the custom CSS file

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="profile-heading">My Profile</h1>

      <div className="profile-info-container">
  <div className="profile-info-left">
    <img
      src={user?.image}
      alt={`profile-${user?.firstName}`}
      className="profile-img"
    />
    <div className="profile-text">
      <p className="profile-name">
        {user?.firstName + " " + user?.lastName}
      </p>
      <p className="profile-email">{user?.email}</p>
    </div>
  </div>
  <IconBtn
    text="Edit"
    onclick={() => {
      navigate("/dashboard/settings");
    }}
  >
    <RiEditBoxLine />
  </IconBtn>
</div>


<div className="profile-section">
  <div className="section-header">
    <p>About</p>
    <IconBtn
      text="Edit"
      onclick={() => {
        navigate("/dashboard/settings");
      }}
    >
      <RiEditBoxLine />
    </IconBtn>
  </div>
  <p className={`about-text ${user?.additionalDetails?.about ? "text-active" : "text-inactive"}`}>
    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
  </p>
</div>


<div className="profile-section">
  <div className="section-header">
    <p>Personal Details</p>
    <IconBtn
      text="Edit"
      onclick={() => {
        navigate("/dashboard/settings");
      }}
    >
      <RiEditBoxLine />
    </IconBtn>
  </div>

  <div className="details-container">
    <div className="details-left">
      <div>
        <p className="detail-label">First Name</p>
        <p className="detail-value">{user?.firstName}</p>
      </div>
      <div>
        <p className="detail-label">Email</p>
        <p className="detail-value">{user?.email}</p>
      </div>
      <div>
        <p className="detail-label">Gender</p>
        <p className="detail-value">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
      </div>
    </div>

    <div className="details-right">
      <div>
        <p className="detail-label">Last Name</p>
        <p className="detail-value">{user?.lastName}</p>
      </div>
      <div>
        <p className="detail-label">Phone Number</p>
        <p className="detail-value">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
      </div>
      <div>
        <p className="detail-label">Date Of Birth</p>
        <p className="detail-value">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}</p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
