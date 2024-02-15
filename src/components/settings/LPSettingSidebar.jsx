import React, { useState } from "react";
import "../styles/LPSetting.css";
import { NavLink, Link } from "react-router-dom";
import arrowLeft from "../../assets/image/arrow-left.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import { getDecryptedUserPath } from "../utils/Constants";

const LPSettingSidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [masterSubMenu, setMasterSubMenu] = useState(null);
  const decryptedUserPath = getDecryptedUserPath();
  const allowed = decryptedUserPath.split(",");
  const isPathAllowed = (path) => {
    if (allowed.length === 0) {
      return true; // All paths are allowed when allowed array is empty
    }
    return allowed.includes(path);
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
        <Link to={"/bmp/academy/overview"}>
          <button className="setting-font-style">
            <img src={arrowLeft} alt="" />
            <span>Go Back</span>
          </button>
        </Link>
      </div>
      <div>
        <p className="setting-heading setting-font-style">Settings</p>
      </div>

      <div>
        {isPathAllowed("/bmp/settings/tournament/add") && (
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

              
      <div className="master-arrow" onClick={() => toggleMasterSubMenu("blog")}>
        <p className="company-options master-settings-options setting-font-style">
          Blog
        </p>
        <img src={masterSubMenu === "blog" ? GreaterUp : GreaterDown} alt="" />
      </div>

      {masterSubMenu === "blog" && (
            <div className="sub-sub-menu">
                <p className="company-options setting-font-style blog-options">
                  <NavLink
                    exact
                    to="/bmp/settings/blog/add"
                    activeClassName="activeLink"
                  >
                    Add
                  </NavLink>
                </p>
                <p className="company-options setting-font-style">
                  <NavLink
                    exact
                    to="/bmp/settings/blog/view"
                    activeClassName="activeLink"
                  >
                    View
                  </NavLink>
                </p>
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
