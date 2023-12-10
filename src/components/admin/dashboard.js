import React from "react";

import MenuData from "../../assets/data/menu.json";
import SideMenuBar from "../shared/sidemenu/component";

function AdminDashboard() {
  return (
    <section className="grid grid-cols-12">
      <SideMenuBar links={MenuData.admin} />
      <div>Dashboard</div>
    </section>
  );
}

export default AdminDashboard;
