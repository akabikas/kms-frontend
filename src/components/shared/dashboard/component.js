import React from "react";

import SessionStorageService from "../../../services/sessionStorage";
import AdminDashboard from "../../admin/dashboard";

export default function DashboardPage() {
  const user = SessionStorageService.getItem("user");

  return <>{user.role === "admin" ? <AdminDashboard /> : ""}</>;
}
