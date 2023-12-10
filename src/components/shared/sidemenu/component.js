import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.svg";
import SessionStorageService from "../../../services/sessionStorage";
import logoutUser from "../../../libs/auth/logoutUser";
import RedirectToLogin from "../../../utils/redirectToLogin";

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
    <header className="col-span-3 min-h-screen overflow-hidden w-full">
      <div className="sidebar bg-secondary fixed left-0 top-0 bottom-0 min-h-screen  px-10 py-6 flex flex-col shadow-xl">
        <div className="top">
          <div className="brand mb-32">
            <img src={Logo} className="w-24" />
          </div>
          <div className="menu">
            <ul className="side-menu">
              {links.map((link, index) => (
                <li
                  key={index}
                  className={`mb-3 ${
                    link.path === currentPath ? "font-bold" : ""
                  }`}
                >
                  <Link to={link.path} className="inline-block transition-all duration-100 hover:translate-x-1">
                    <i
                      className={`fa-light ${link.icon} pr-4 ${
                        link.path === currentPath ? "font-regular" : ""
                      }`}
                    ></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto flex gap-x-4 items-center">
          <img
            className="w-12 rounded-full h-12 object-cover"
            src="https://images.unsplash.com/photo-1559893088-c0787ebfc084?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="overview">
            <p className="font-bold">{user.name}</p>
            <p className="text-xxxs">{user.email}</p>
          </div>
          <div className="logout pl-5 pt-3 cursor-pointer">
            <a onClick={handleLogout} className="inline-block transition-all duration-100 hover:translate-x-1">
              <i className="text-sm fa-light fa-arrow-right-from-bracket"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SideMenuBar;
