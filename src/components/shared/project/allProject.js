import React, { useEffect, useState } from "react";
import Layout from "../../shared/layout/component";

import MenuData from "../../../assets/data/menu.json";
import SessionStorageService from "../../../services/sessionStorage";
import getAllProjects from "../../../libs/project/getProjects";
import { Link } from "react-router-dom";
import deleteProject from "../../../libs/project/deleteProject";
import DeleteModal from "../../shared/modal/deleteModal";

function AllProject() {
  const [projects, setProjects] = useState([]);
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getAllProjects(token, user);

        if (projectsData.success) {
          setProjects(projectsData.data.projects);
        } else {
          console.error(projectsData.error);
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const deleteProjectResponse = await deleteProject(token, projectToDelete);

      if (deleteProjectResponse.success) {
        const projectsData = await getAllProjects(token, user);
        setProjects(projectsData.data.projects);
        setShowDeleteModal(false);
      } else {
        console.error(deleteProjectResponse.error);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  return projects !== "" ? (
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
          title="Delete project"
          caption="Are you sure you want to remove the project? All of your data will be permanently removed from our servers forever. This action cannot be undone."
          icon="fa-trash"
          buttonText="Delete"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <section className="all-projects">
        <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 class="text-sm font-semibold leading-6 text-gray-900">
            All projects
          </h3>
        </div>
        <div className="relative mt-10">
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
                            Project title
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                          >
                            Assigned to
                          </th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-xxs font-semibold text-gray-900"
                          >
                            Status
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
                        {projects?.map((projectsSingle, index) => (
                          <tr key={index}>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-xxs font-medium text-gray-900 sm:pl-6 capitalize">
                              {projectsSingle.name}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500">
                              {projectsSingle.description
                                .split(" ")
                                .slice(0, 5)
                                .join(" ") + "..."}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-xxs text-gray-500">
                              {projectsSingle.assignedTo.map(
                                (assignedUser, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-[12px] font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-2"
                                  >
                                    {assignedUser.name}
                                  </span>
                                )
                              )}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-xxxs text-gray-500 capitalize flex">
                              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                                <time
                                  class="text-gray-400 sm:hidden"
                                  datetime="2023-01-23T11:00"
                                >
                                  45 minutes ago
                                </time>
                                <div class={`flex-none rounded-full p-1 ${projectsSingle.status === "active" ? "bg-blue-300" : projectsSingle.status === "archived" ? "bg-rose-300" : "bg-green-300"}`}>
                                  <div class={`h-1.5 w-1.5 rounded-full ${projectsSingle.status === "active" ? " bg-blue-500" : projectsSingle.status === "archived" ? "bg-rose-500" : "bg-green-500"}`}></div>
                                </div>
                                <div class="hidden text-primary sm:block">
                                  {projectsSingle.status}
                                </div>
                              </div>
                            </td>
                            <td class="relative whitespace-nowrap py-4 px-3 text-xxs font-medium">
                              <Link
                                to={`/projects/${projectsSingle._id}`}
                                className=" bg-transparent mr-3 cursor-pointer"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </Link>
                              <span className="bg-transparent cursor-pointer">
                                <i className="fa-regular fa-pen-to-square"></i>
                              </span>
                              <span
                                className={`ml-3 bg-transparent delete-user cursor-pointer ${
                                  user._id === projectsSingle._id
                                    ? "disabled opacity-25"
                                    : ""
                                }`}
                                onClick={() => handleDelete(projectsSingle._id)}
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
        </div>
        {user.role === "admin" && (
          <div className="button-wrapper flex justify-end mt-10">
            <Link
              to="/projects/add-project"
              className="border border-primary rounded-md outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
            >
              Add new
            </Link>
          </div>
        )}
      </section>
    </Layout>
  ) : (
    "Loading"
  );
}

export default AllProject;
