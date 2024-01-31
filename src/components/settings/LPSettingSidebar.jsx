import React, { useState } from "react";
import "../styles/LPSetting.css";
import { NavLink } from "react-router-dom";
import arrowLeft from "../../assets/image/arrow-left.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import { getDecryptedUserPath } from "../utils/Constants";

const LPSettingSidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [masterSubMenu, setMasterSubMenu] = useState(null);
  const decryptedUserPath = getDecryptedUserPath();
  const allowed = decryptedUserPath.split(",");
  // const allowed = [
  //   "/bmp/lead",
  //   "/bmp/home",
  //   "/bmp/mail",
  //   "/bmp/contacts",
  //   "/bmp/deals",
  //   "/bmp/settings",
  //   "/bmp/settings/general",
  //   "/bmp/settings/notification",
  //   "/bmp/settings/usernteams",
  //   "/bmp/settings/companysettings",
  //   "/bmp/settings/recyclebin",
  //   "/bmp/settings/privacyConcent",
  //   "/bmp/settings/settingLeads",
  //   "/bmp/settings/settingDeal",
  //   "/bmp/settings/settingUsage",
  //   "/bmp/settings/settingImpExp",
  //   "/bmp/settings/blog/add",
  //   "/bmp/settings/blog/view",
  //   "/bmp/settings/sitePages/add",
  //   "/bmp/settings/sitePages/view",
  //   "/bmp/settings/hebmpSection/add",
  //   "/bmp/settings/hebmpSection/update",
  //   "/bmp/settings/userManagement/add",
  //   "/bmp/settings/userManagement/update",
  //   "/bmp/settings/employee/add",
  //   "/bmp/settings/employee/view",
  //   "/bmp/settings/accessManagement",
  //   "/bmp/settings/reportsAndAnalytics",
  //   "/bmp/settings/masterSettings/City",
  //   "/bmp/settings/system/state",
  //   "/bmp/settings/employeeProfile",
  //     "/bmp/settings/viewProfile/timeSheet",
  //     "/bmp/settings/viewProfile/documents",
  //     "/bmp/settings/viewProfile/salarySlip",
  // ];
  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true; // All paths are allowed when allowed array is empty
    }
    return allowed.includes(path);
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate back in the browser history
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu((prevSubMenu) => (prevSubMenu === submenu ? null : submenu));
  };
  const toggleMasterSubMenu = (submenu) => {
    setMasterSubMenu((prevSubMenu) =>
      prevSubMenu === submenu ? null : submenu
    );
  };
  return (
    <section className="setting-side-panel">
      <div className="go-back-btn ">
        <button className="setting-font-style" onClick={handleGoBack}>
          <img src={arrowLeft} alt="" />
          <span>Go Back</span>
        </button>
      </div>
      <div>
        <p className="setting-heading setting-font-style">Settings</p>
      </div>
      
      <div>
        {isPathAllowed("/bmp/settings/blog/add") && (
          <div
            className="setting-arrow"
            onClick={() => toggleSubMenu("master")}
          >
            <p className="company-setup setting-font-style">Master Settings</p>
            <img
              src={openSubMenu === "master" ? GreaterUp : GreaterDown}
              alt=""
            />
          </div>
        )}
      </div>

      {openSubMenu === "master" && (
        <>
         {(isPathAllowed("/bmp/settings/blog/add") ||
            isPathAllowed("/bmp/settings/blog/view")) && (
              <div
                className="master-arrow"
                onClick={() => toggleMasterSubMenu("blog")}
              >
                <p className="company-options master-settings-options setting-font-style">
                  Blog
                </p>
                <img
                  src={masterSubMenu === "blog" ? GreaterUp : GreaterDown}
                  alt=""
                />
              </div>
            )}

          {masterSubMenu === "blog" && (
            <div className="sub-sub-menu">
              {isPathAllowed("/bmp/settings/blog/add") && (
                <p className="company-options setting-font-style blog-options">
                  <NavLink
                    exact
                    to="/bmp/settings/blog/add"
                    activeClassName="activeLink"
                  >
                    Add
                  </NavLink>
                </p>
              )}
              {isPathAllowed("/bmp/settings/blog/view") && (
                <p className="company-options setting-font-style">
                  <NavLink
                    exact
                    to="/bmp/settings/blog/view"
                    activeClassName="activeLink"
                  >
                    View
                  </NavLink>
                </p>
              )}
            </div>
          )}

          {isPathAllowed("/bmp/settings/review/view") && (
            <>
              <div
                className="master-arrow"
                onClick={() => toggleMasterSubMenu("review")}
              >
                <p className="company-options master-settings-options setting-font-style">
                  Review
                </p>
                <img
                  src={masterSubMenu === "review" ? GreaterUp : GreaterDown}
                  alt=""
                />
              </div>
              {masterSubMenu === "review" && (
                <div className="sub-sub-menu">
                  {isPathAllowed("/bmp/settings/review/view") && (
                    <p className="company-options setting-font-style">
                      <NavLink
                        exact
                        to="/bmp/settings/review/view"
                        activeClassName="activeLink"
                      >
                        View
                      </NavLink>
                    </p>
                  )}
                </div>
              )}
            </>
          )}


          {(isPathAllowed("/bmp/settings/tournament/add") ||
            isPathAllowed("/bmp/settings/tournament/view")) && (
              <>
                <div
                  className="master-arrow"
                  onClick={() => toggleMasterSubMenu("tournament")}
                >
                  <p className="company-options master-settings-options setting-font-style">
                    Tournament
                  </p>
                  <img
                    src={masterSubMenu === "tournament" ? GreaterUp : GreaterDown}
                    alt=""
                  />
                </div>
                {masterSubMenu === "tournament" && (
                  <div className="sub-sub-menu">
                    {isPathAllowed("/bmp/settings/tournament/add") && (
                      <p className="company-options setting-font-style blog-options">
                        <NavLink
                          exact
                          to="/bmp/settings/tournament/add"
                          activeClassName="activeLink"
                        >
                          Add
                        </NavLink>
                      </p>
                    )}
                    {isPathAllowed("/bmp/settings/tournament/view") && (
                      <p className="company-options setting-font-style">
                        <NavLink
                          exact
                          to="/bmp/settings/tournament/view"
                          activeClassName="activeLink"
                        >
                          View
                        </NavLink>
                      </p>
                    )}
                  </div>
                )}
              </>
            )}         
        </>
      )}
    </section>
  );
};

export default LPSettingSidebar;
