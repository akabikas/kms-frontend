import React, { useEffect } from "react";
import SessionStorageService from "../services/sessionStorage";
import RedirectToDashboard from "../utils/redirectToDashboard";

const AuthGuard = ({ children }) => {
  const token = SessionStorageService.getItem("token");

  if (token) {
    RedirectToDashboard();
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
