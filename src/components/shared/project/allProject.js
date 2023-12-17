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
          <table className="w-full text-sm text-left rtl:text-right ">
            <thead className="text-xxs">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3  text-secondary bg-primary"
                >
                  Project title
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Assigned to
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-secondary bg-primary">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((projectsSingle, index) => (
                <tr className="border-0 text-xxs text-primary" key={index}>
                  <td
                    scope="row"
                    className="px-6 py-4 bg-gray-100 font-regular"
                  >
                    {projectsSingle.name}
                  </td>
                  <td className="px-6 py-4 bg-gray-100">
                    {projectsSingle.description
                      .split(" ")
                      .slice(0, 5)
                      .join(" ") + "..."}
                  </td>
                  <td className="px-6 py-4 bg-gray-100">
                    {projectsSingle.assignedTo.map((assignedUser, index) => (
                      <span
                        key={index}
                        className=" bg-emerald-600 text-white mr-2 text-xxxs px-2.5 rounded-full"
                      >
                        {assignedUser.name}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 bg-gray-100 capitalize">
                    {projectsSingle.status}
                  </td>
                  <td className="flex items-center px-6 py-4 bg-gray-100">
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
