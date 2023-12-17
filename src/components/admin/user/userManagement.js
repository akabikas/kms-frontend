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
          <h3 class="text-xxs font-semibold leading-6 text-gray-900">
            User management
          </h3>
        </div>
        <div className="relative mt-10">
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-xxs font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                        >
                          Emal
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                        >
                          Password
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                        >
                          Organisation
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                        >
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      {users?.map((userSingle, index) => (
                        <tr key={index}>
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-xxs font-medium text-gray-900 sm:pl-6 capitalize">
                            {userSingle.name}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500">
                            {userSingle.email}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500">
                            ******
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500">
                            {userSingle.organisation}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500 capitalize">
                            {userSingle.role}
                          </td>
                          <td class="relative whitespace-nowrap py-4 px-3 pl-0 text-xxs font-medium">
                            <span
                              className={`ml-3 bg-transparent delete-user cursor-pointer ${
                                user._id === userSingle._id
                                  ? "disabled opacity-25"
                                  : ""
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
              </div>
            </div>
          </div>
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
