import React, { useState } from "react";

import MenuData from "../../../assets/data/menu.json";
import Layout from "../layout/component";
import SessionStorageService from "../../../services/sessionStorage";
import EditPersonalInfo from "./personal/personalInfo";
import ChangePass from "./changePass/changePass";

function EditAccount() {
  const user = SessionStorageService.getItem("user");

  return (
    <Layout
      MenuData={
        user.role === "admin"
          ? MenuData.admin
          : user.role === "employee"
          ? MenuData.employee
          : MenuData.client
      }
    >
      <section>
        <div>
          <h1 className="text-sm font-bold">Edit account information</h1>
        </div>
        <div className="mt-20">
          <EditPersonalInfo />
          <ChangePass />
        </div>
      </section>
    </Layout>
  );
}

export default EditAccount;
