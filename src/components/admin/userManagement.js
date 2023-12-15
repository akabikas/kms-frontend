import React, { useEffect, useState } from "react";
import Layout from "../shared/layout/component";
import { Link } from "react-router-dom";

import MenuData from "../../assets/data/menu.json";
import getAllUsers from "../../libs/auth/getAllUsers";
import SessionStorageService from "../../services/sessionStorage";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers(token, user);
        
        if (usersData.success) {
          setUsers(usersData.data.users);
        } else {
          console.error(usersData.error);
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout MenuData={MenuData.admin}>
      <div className="page_content">
        <h1 className="text-sm font-bold">User management</h1>
        <div className="relative mt-10">
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xxs">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-secondary bg-primary"
                >
                  Fullname
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Organisation
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Roles
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr className="border-0 text-xxs text-primary" key={index}>
                  <td
                    scope="row"
                    className="px-6 py-4 bg-gray-100 font-regular"
                  >
                    {user.name}
                  </td>
                  <td className="px-6 py-4 bg-gray-100">{user.email}</td>
                  <td className="px-6 py-4 bg-gray-100">**********</td>
                  <td className="px-6 py-4 bg-gray-100 capitalize">
                    {user.organisation}
                  </td>
                  <td className="px-6 py-4 bg-gray-100 capitalize">
                    {user.role}
                  </td>
                  <td className="flex items-center px-6 py-4 bg-gray-100">
                    <a href="#" className=" bg-transparent">
                      <i className="fa-light fa-pen-to-square"></i>
                    </a>
                    <a href="#" className=" ml-3 bg-transparent">
                      <i className="fa-regular fa-trash-can"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-wrapper flex justify-end mt-10">
          <Link
            to="/user-management/add-user"
            className="border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
          >
            Add new
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default UserManagement;
