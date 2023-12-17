import React, { useEffect, useState } from "react";
import SessionStorageService from "../../services/sessionStorage";
import getAllProjects from "../../libs/project/getProjects";
import { Link } from "react-router-dom";
import getAllUsers from "../../libs/auth/getAllUsers";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-rose-500",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
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

    const fetchUsers = async () => {
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

    fetchUsers();
    fetchProjects();
  }, []);


  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div>
      <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-10">
        <h3 class="text-xxs font-semibold leading-6 text-gray-900">
          Dashboard
        </h3>
      </div>

      <dl className="mx-auto grid grid-cols-1 bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-indigo-600 px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-xxs font-medium leading-6 bg-transparent text-white">
            Users
          </dt>
          <dd className="text-xxxs font-medium bg-transparent text-white">+4%</dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight bg-transparent text-white">
            + {users && users.length}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-rose-600 px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-xxs font-medium leading-6 text-white bg-transparent">
            Projects
          </dt>
          <dd className="text-xxxs font-medium text-white bg-transparent">+78%</dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight bg-transparent text-white">
            + {projects && projects.length}
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-green-600 px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-xxs font-medium leading-6 text-white bg-transparent">
            Impressions
          </dt>
          <dd className="text-xxxs font-medium text-white bg-transparent">-28%</dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight bg-transparent text-white">
            + 23,3431
          </dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-orange-600 px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-xxs font-medium leading-6 text-white bg-transparent">
            Engagement
          </dt>
          <dd className="text-xxxs font-medium text-white bg-transparent">+16%</dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight bg-transparent text-white">
            + 70%
          </dd>
        </div>
      </dl>



      <h2 className="text-xxs font-medium text-gray-500">Recent projects</h2>
      <ul
        role="list"
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <li key={index} className={`col-span-1 flex rounded-md shadow-sm`}>
            <div
              className={`flex w-16 flex-shrink-0 items-center justify-center ${getRandomColor()} rounded-l-md text-xxs font-medium text-white uppercase`}
            >
              {project.name.substring(0, 2)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-xxs">
                <a
                  href="#"
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {project.name}
                </a>
                <p className="text-gray-500">
                  {project.assignedTo.length} Members
                </p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <Link
                  to={`/projects${project._id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <i className="fa-regular fa-arrow-up-right-from-square"></i>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
