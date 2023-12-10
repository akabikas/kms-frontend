import React from "react";

import MenuData from "../../assets/data/menu.json";
import SideMenuBar from "../shared/sidemenu/component";

function AdminDashboard() {
  return (
    <section className="grid grid-cols-12">
      <SideMenuBar links={MenuData.admin} />
      <section className="col-span-10">

      </section>
    </section>
  );
}

export default AdminDashboard;
