import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { resetCourseState } from "../../../slices/courseSlice";
import './SidebarLink.css'; // Import the custom CSS file

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`sidebar-link ${matchRoute(link.path) ? "active" : ""}`}
    >
      <span className={`sidebar-highlight ${matchRoute(link.path) ? "visible" : ""}`}></span>
      <div className="link-content">
        <Icon className="link-icon" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
