import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.svg";
import SessionStorageService from "../../../services/sessionStorage";
import logoutUser from "../../../libs/auth/logoutUser";
import RedirectToLogin from "../../../utils/redirectToLogin";
import UserIcon from "../../../assets/img/user.png";

function SideMenuBar({ links }) {
  const currentPath = window.location.pathname;

  const user = SessionStorageService.getItem("user");
  const token = SessionStorageService.getItem("token");

  const handleLogout = async () => {
    const { success, error } = await logoutUser(token);

    if (success) {
      RedirectToLogin();
    } else {
      return;
    }
  };

  return (
    <header className="col-span-5 min-h-screen fixed left-0 top-0 bottom-0 shadow-xl  px-10 py-6">
      <div className="sidebar bg-secondary h-[calc(100vh-48px)]  flex flex-col ">
        <div className="top">
          <div className="brand mb-16   px-4">
            <img src={Logo} className="w-24" />
          </div>
          <div className="menu">
            <ul className="side-menu">
              {links.map((link, index) => (
                <li
                  key={index}
                  className={`mb-3  px-4 py-2 cursor-pointer ${
                    currentPath.startsWith(link.path)
                      ? "font-bold bg-gray-100 rounded-md"
                      : ""
                  }`}
                >
                  <Link
                    to={link.path}
                    className="block transition-all duration-100 hover:translate-x-1 bg-transparent"
                  >
                    <i
                      className={`fa-light ${link.icon} pr-4 bg-transparent ${
                        currentPath.startsWith(link.path) ? "font-regular" : ""
                      }`}
                    ></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-10 mt-10">
          <h2 className="text-xxxs text-gray-500 mb-4  px-4">Your items</h2>
          <ul>
            <li
              className={`mb-3  px-4 py-2 cursor-pointer  ${
                currentPath.startsWith("/edit-account")
                  ? "font-bold bg-gray-100 rounded-md"
                  : ""
              }`}
            >
              {" "}
              <Link
                to="/edit-account"
                className="block transition-all duration-100 hover:translate-x-1 bg-transparent"
              >
                <i
                  className={`fa-light fa-gear mr-4 bg-transparent ${
                    currentPath.startsWith("/edit-account") ? "font-regular" : ""
                  }`}
                ></i>
                Edit account
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto flex gap-x-4 items-center">
          <img
            className="w-12 rounded-full h-12 object-cover object-center"
            src={
              user.profilePicture
                ? `http://localhost:3000/${user.profilePicture}`
                : UserIcon
            }
          />
          <div className="overview">
            <p className="font-bold">{user.name}</p>
            <p className="text-xxxs">{user.email}</p>
          </div>
          <div className="logout pl-5 pt-3 cursor-pointer">
            <a
              onClick={handleLogout}
              className="inline-block transition-all duration-100 hover:translate-x-1"
            >
              <i className="text-sm fa-light fa-arrow-right-from-bracket"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SideMenuBar;
