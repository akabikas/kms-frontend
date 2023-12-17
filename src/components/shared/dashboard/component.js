import React from "react";

import SessionStorageService from "../../../services/sessionStorage";
import AdminDashboard from "../../admin/dashboard";
import MenuData from "../../../assets/data/menu.json";
import Layout from "../layout/component";

export default function DashboardPage() {
  const user = SessionStorageService.getItem("user");

  return (
    <>
      <Layout
        MenuData={
          user.role === "admin"
            ? MenuData.admin
            : user.role === "employee"
            ? MenuData.employee
            : MenuData.client
        }
      >
        {user.role === "admin" ? <AdminDashboard /> : ""}
      </Layout>
    </>
  );
}
