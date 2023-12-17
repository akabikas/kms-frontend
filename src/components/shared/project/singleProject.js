import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MenuData from "../../../assets/data/menu.json";
import Layout from "../layout/component";
import SessionStorageService from "../../../services/sessionStorage";
import getSingleProjects from "../../../libs/project/getSingleProject";
import getEmailsById from "../../../libs/conversations/getEmailById";
import UserIcon from "../../../assets/img/user.png";

function SingleProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [emails, setEmails] = useState([]);
  const [documentsArray, setDocumentsArray] = useState([]);
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getSingleProjects(token, user, projectId);

        if (projectsData.success) {
          setProject(projectsData.data.project);

          if (projectsData.data.project.emailConversation) {
            const projectsEmails = await getEmailsById(
              token,
              projectsData.data.project.emailConversation._id
            );
            if (projectsEmails.success) {
              setEmails(projectsEmails.data.emails);
            } else {
              console.error(projectsEmails.error);
            }
          }
        } else {
          console.error(projectsData.error);
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (project.documents) {
      const documentsString = project.documents;
      const newDocumentsArray = documentsString
        .split(",")
        .map((item) => item.trim());
      setDocumentsArray(newDocumentsArray);
    }
  }, [project.documents]);

  return (
    <Layout
      MenuData={
        user.role === "admin"
          ? MenuData.admin
          : user.role === "employee"
          ? MenuData.employee
          : MenuData.client
      }
    >
      <section className="single-project pb-40">
        <div className="overview">
          <h1 className="text-lg font-bold">{project.name}</h1>
          <div className="">
            <h5 className="mt-10 text-gray-500 text-xxxs">
              <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 font-medium text-gray-900 ring-1 ring-inset ring-gray-200 text-xxxs capitalize">
                <svg
                  className="h-1.5 w-1.5 fill-green-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                {project.status}
              </span>
            </h5>
            <h5 className="mt-5 text-gray-500 text-xxxs">
              Assigned to
              <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                {project.assignedTo?.map((user, index) => (
                  <li
                    className="col-span-1  bg-white shadow border"
                    key={index}
                  >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-xxs font-medium text-gray-900">
                            {user.name}
                          </h3>
                          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xxxs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 capitalize">
                            {user.role}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xxs text-gray-500">
                          {user.biography}
                        </p>
                      </div>
                      <img
                        className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300  object-cover"
                        src={`http://localhost:3000/${user.profilePicture}`}
                        alt=""
                      ></img>
                    </div>
                    <div>
                      <div className="-mt-px flex border-t">
                        <div className="flex w-0 flex-1">
                          <a
                            href="mailto:janecooper@example.com"
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-xxxs font-semibold text-gray-900"
                          >
                            <i className="fa-regular fa-envelope"></i>
                            Messaage
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </h5>
          </div>
        </div>
        <div className="descirption mt-20">
          <p>{project.description}</p>
        </div>

        <div className="documents mt-20">
          <dt className="text-xxs font-medium leading-6 text-gray-900 mb-2">
            Documents
          </dt>
          <dd className="mt-2 text-xxs text-gray-900">
            <ul
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              {documentsArray.map((document, index) => (
                <li
                  className="flex items-center justify-between py-4 pl-4 pr-5 text-xxs leading-6"
                  key={index}
                >
                  <div className="flex w-0 flex-1 items-center">
                    <i className="fa-light fa-paperclip"></i>
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        Resource file {index + 1}
                      </span>
                      <span className="flex-shrink-0 text-xxxs text-gray-400">
                        These resources will help you with this projects.
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href={`http://localhost:3000/${document}`}
                      target="_blank"
                      className=" text-xxxs font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="flow-root mt-20">
          <dt className="text-xxs font-medium leading-6 text-gray-900 mb-10">
            Previous email conversation
          </dt>
          <div
            className="email-list-container border border-gray-200 px-10 py-10"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <ul role="list" className="-mb-8">
              {emails
                ? emails.map((email, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== emails.length - 1 ? (
                          <span
                            className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          ""
                        )}
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <img
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                              src={UserIcon}
                              alt=""
                            ></img>
                            <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-xxs">
                                <a
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  {email.sentBy}
                                </a>
                              </div>
                              <p className="mt-0.5 text-xxs text-gray-500">
                                Received by : {email.receivedBy}
                              </p>
                            </div>
                            <div className="mt-2 text-xxs text-gray-700">
                              <p>{email.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>

        <div className="button-wrapper flex justify-end mt-20">
          <Link
            to="/projects"
            className="border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
          >
            Back to all projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default SingleProject;
