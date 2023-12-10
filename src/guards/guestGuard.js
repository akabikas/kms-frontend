import React from "react";
import SessionStorageService from "../services/sessionStorage";
import RedirectToLogin from "../utils/redirectToLogin";

const GuestGuard = ({ children }) => {
  const token = SessionStorageService.getItem("token");

  if (!token) {
    RedirectToLogin();
  } else {
    return <>{children}</>;
  }
};

export default GuestGuard;
