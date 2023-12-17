import React, { useEffect, useState } from "react";
import Layout from "../../shared/layout/component";
import { Link } from "react-router-dom";

import MenuData from "../../../assets/data/menu.json";
import getAllUsers from "../../../libs/auth/getAllUsers";
import SessionStorageService from "../../../services/sessionStorage";
import deleteUser from "../../../libs/auth/deleteUser";
import DeleteModal from "../../shared/modal/deleteModal";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === "admin") {
          const usersData = await getAllUsers(token, user);

          if (usersData.success) {
            setUsers(usersData.data.users);
          } else {
            console.error(usersData.error);
          }
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (user._id === id) {
      console.log("You can't delete this user");
      return;
    }
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const deleteUserResponse = await deleteUser(token, userToDelete);

      if (deleteUserResponse.success) {
        const usersData = await getAllUsers(token, user);
        setUsers(usersData.data.users);
        setShowDeleteModal(false);
      } else {
        console.error(deleteUserResponse.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return user.role === "admin" ? (
    <Layout
      MenuData={
        user.role === "admin"
          ? MenuData.admin
          : user.role === "employee"
          ? MenuData.employee
          : MenuData.client
      }
    >
      {showDeleteModal && (
        <DeleteModal
          title="Delete user"
          caption="Are you sure you want to delete this user?"
          icon="fa-trash"
          buttonText="Delete"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <div className="page_content">
        <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 class="text-sm font-semibold leading-6 text-gray-900">
            User management
          </h3>
        </div>
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
              {users?.map((userSingle, index) => (
                <tr className="border-0 text-xxs text-primary" key={index}>
                  <td
                    scope="row"
                    className="px-6 py-4 bg-gray-100 font-regular"
                  >
                    {userSingle.name}
                  </td>
                  <td className="px-6 py-4 bg-gray-100">{userSingle.email}</td>
                  <td className="px-6 py-4 bg-gray-100">**********</td>
                  <td className="px-6 py-4 bg-gray-100 capitalize">
                    {userSingle.organisation}
                  </td>
                  <td className="px-6 py-4 bg-gray-100 capitalize">
                    {userSingle.role}
                  </td>
                  <td className="flex items-center px-6 py-4 bg-gray-100">
                    {/* <span className=" bg-transparent">
                      <i className="fa-light fa-pen-to-square"></i>
                    </span> */}
                    <span
                      className={`ml-3 bg-transparent delete-user cursor-pointer ${
                        user._id === userSingle._id ? "disabled opacity-25" : ""
                      }`}
                      onClick={() => handleDelete(userSingle._id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-wrapper flex justify-end mt-10">
          <Link
            to="/user-management/add-user"
            className="border border-primary rounded-md outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
          >
            Add new
          </Link>
        </div>
      </div>
    </Layout>
  ) : (
    (window.location.href = "/dashboard")
  );
}

export default UserManagement;
