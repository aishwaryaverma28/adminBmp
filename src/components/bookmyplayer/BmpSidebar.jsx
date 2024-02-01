import React from "react";
import "../styles/LPSetting.css";
import "../styles/bmp.css";
import { NavLink, useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/image/arrow-left.svg";

const BmpSidebar = () => {
  const userRole = localStorage.getItem("role_name");
  const navigate = useNavigate();
  const id = localStorage.getItem("academy_id");
  const handleBackToTable = () => {
    localStorage.removeItem("academy_id");
    navigate("/bmp/admin");
  };

  return (
    <section className="setting-side-panel">
      {userRole === "Academy_admin" && (
        <div className="back-to-user general-refresh blog-back">
          <button className="common-fonts" onClick={handleBackToTable}>
            <img src={LeftArrow} alt="" />
            <span>Back To Table</span>
          </button>
        </div>
      )}
      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        Profile
      </p>
      <p className="prefrence-options setting-font-style">

      {
        userRole === "Academy_admin" ? (
          <NavLink exact to={`/bmp/academy/overview/${id}`}>
          Overview
        </NavLink>
        ) : (
          <NavLink exact to={`/bmp/academy/overview`}>
          Overview
        </NavLink>
        )
      }
      </p>
      {/* <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/fees">
          Fees and Batches
        </NavLink>
      </p> 
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/training">
          Training Strategy
        </NavLink>
      </p> */}
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/gallery">
          Photos & Video
        </NavLink>
      </p>

      <p className="prefrence-options setting-font-style bmp-profile-txt common-fonts">
        System
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/leads">
          Leads
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/reviews">
          Reviews
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/approval">
          Approval Status
        </NavLink>
      </p>
      <p className="prefrence-options setting-font-style">
        <NavLink exact to="/bmp/academy/support">
          Contact Support
        </NavLink>
      </p>
    </section>
  );
};

export default BmpSidebar;
