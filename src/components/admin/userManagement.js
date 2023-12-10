import React from "react";
import Layout from "../shared/layout/component";

import MenuData from "../../assets/data/menu.json";

function UserManagement() {
  return (
    <Layout MenuData={MenuData.admin}>
      <div className="page_content">
        <h1 className="text-sm font-bold">User management</h1>
        <div class="relative mt-10">
          <table class="w-full text-sm text-left rtl:text-right ">
            <thead class="text-xxs">
              <tr>
                <th scope="col" class="px-6 py-3  text-secondary bg-primary">
                  Fullname
                </th>
                <th scope="col" class="px-6 py-3 text-secondary bg-primary">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-secondary bg-primary">
                  Password
                </th>
                <th scope="col" class="px-6 py-3 text-secondary bg-primary">
                  Organisation
                </th>
                <th scope="col" class="px-6 py-3 text-secondary bg-primary">
                  Roles
                </th>
                <th scope="col" class="px-6 py-3 text-secondary bg-primary">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-0 text-xxs text-primary">
                <th scope="row" class="px-6 py-4 bg-gray-100 font-regular">
                  John Doe
                </th>
                <td class="px-6 py-4 bg-gray-100">john576@gmail.com</td>
                <td class="px-6 py-4 bg-gray-100">**********</td>
                <td class="px-6 py-4 bg-gray-100">H&K</td>
                <td class="px-6 py-4 bg-gray-100">Admin</td>
                <td class="flex items-center px-6 py-4 bg-gray-100">
                  <a href="#" class=" bg-transparent">
                    <i className="fa-light fa-pen-to-square"></i>
                  </a>
                  <a href="#" class=" ml-3 bg-transparent">
                    <i className="fa-regular fa-trash-can"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default UserManagement;
