import React, { useEffect, useState } from "react";
import Layout from "../../shared/layout/component";

import MenuData from "../../../assets/data/menu.json";
import SessionStorageService from "../../../services/sessionStorage";
import getAllProjects from "../../../libs/project/getProjects";
import { Link } from "react-router-dom";
import deleteProject from "../../../libs/project/deleteProject";

function AllProject() {
  const [projects, setProjects] = useState([]);
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

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
    try {
      const deleteProjectResponse = await deleteProject(token, id);

      if (deleteProjectResponse.success) {
        const projectsData = await getAllProjects(token, user);
        setProjects(projectsData.data.projects);
      } else {
        console.error(deleteProjectResponse.error);
      }
    } catch (error) {}
  };

  return (
    <Layout MenuData={MenuData.admin}>
      <section className="all-projects">
        <div className="title">
          <h1 className="text-sm font-bold">All projects</h1>
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
                    {projectsSingle.description}
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
                    <span className=" bg-transparent">
                      <i className="fa-light fa-pen-to-square"></i>
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
        <div className="button-wrapper flex justify-end mt-10">
          <Link
            to="/projects/add-project"
            className="border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
          >
            Add new
          </Link>
        </div>
      </section>
    </Layout>
  );
}
//   onClick={() => handleDelete(projectsingle._id)}
export default AllProject;
