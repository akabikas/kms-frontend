import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/img/logo.svg";

function SideMenuBar({ links }) {
  const currentPath = window.location.pathname;

  return (
    <header className="col-span-2 relative shadow-xl min-h-screen">
      <div className="sidebar bg-secondary fixed left-0 top-0 bottom-0 min-h-screen  px-10 py-6">
        <div className="brand mb-32">
          <img src={Logo} className="w-24" />
        </div>
        <div className="menu">
          <ul className="side-menu">
            {links.map((link, index) => (
              <li key={index} className={`mb-3 ${link.path === currentPath ? 'font-bold' : ''}`}>
                <Link href={link.path}>
                  <i className={`fa-light ${link.icon} pr-4 ${link.path === currentPath ? 'font-regular' : ''}`}></i>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default SideMenuBar;
