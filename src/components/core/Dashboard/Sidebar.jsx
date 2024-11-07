import { useState } from "react";
import { VscSignOut, VscMenu, VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open

  if (profileLoading || authLoading) {
    return (
      <div className="sidebar-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
  };

  const handleLogout = () => {
    dispatch(logout(navigate)); // Dispatch the logout action directly
  };

  return (
    <>
      {/* Toggle button for sidebar */}
      <button className="menu-toggle-button1" onClick={toggleSidebar}>
        {isSidebarOpen ? <VscChromeClose className="icon1" /> : <VscMenu className="icon1" />}
      </button>

      {/* Sidebar container with dynamic class based on isSidebarOpen */}
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="link-list">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="divider" />
        <div className="settings-logout">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={handleLogout} // Directly trigger logout on click
            className="logout-button"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="icon" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
