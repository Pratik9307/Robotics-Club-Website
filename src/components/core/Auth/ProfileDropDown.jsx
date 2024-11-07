import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileDropDown.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Handle clicking outside the dropdown
  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div className="profile-dropdown-container" ref={ref}>
      <div
        className="profile-info"
        onClick={() => setOpen((prev) => !prev)} // Toggle dropdown on click
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-image"
        />
        <AiOutlineCaretDown className="dropdown-icon" />
      </div>

      {open && (
        <div className="dropdown-menu">
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="dropdown-item">
              <VscDashboard className="dropdown-icon-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="dropdown-item"
          >
            <VscSignOut className="dropdown-icon-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
