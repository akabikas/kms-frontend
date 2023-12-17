import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SessionStorageService from "../../../services/sessionStorage";
import Layout from "../layout/component";
import MenuData from "../../../assets/data/menu.json";
import getSingleProjects from "../../../libs/project/getSingleProject";
import NotificationModal from "../modal/notificationModal";
import getAllUsers from "../../../libs/auth/getAllUsers";
import getAllConversations from "../../../libs/conversations/getConversations";
import Select from "react-tailwindcss-select";

function EditProject() {
  const { projectId } = useParams();
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getSingleProjects(token, user, projectId);

        if (projectsData.success) {
          setProject(projectsData.data.project);
        } else {
          console.error(projectsData.error);
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
  }, []);

  const initFormValues = {
    title: "",
    description: "",
    status: "",
    assignedTo: "",
    documents: [],
    assignedEmail: "",
  };
  
  const initFormState = {
    values: initFormValues,
  };
  
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formState, setFormState] = useState(initFormState);
  const [touched, setTouched] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const { values } = formState;

  const [assignedTo, setAssignedTo] = useState(null);

  const handleassignedTo = (value) => {
    setAssignedTo(value);
    const idsArray = value.map((item) => item.value);
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        assignedTo: idsArray,
      },
    }));
  };

  useEffect(() => {
    const updatedInitFormValues = {
      title: project.name || '',
      description: project.description || '',
      status: project.status || '',
      assignedTo: project.assignedTo || [],
      documents: [],
      assignedEmail: project.emailConversation?._id || '',
    };
  
    setFormState((prev) => ({
      ...prev,
      values: updatedInitFormValues,
    }));
  }, [project]);
  

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

    const fetchConversations = async () => {
      try {
        const conversationData = await getAllConversations(token, user);

        if (conversationData.success) {
          setConversations(conversationData.data.conversations);
        } else {
          console.error(conversationData.error);
        }
      } catch (error) {
        console.error("Error during user retrieval:", error.message);
      }
    };

    fetchData();
    fetchConversations();
  }, []);

  const options = users.map((user) => ({
    value: user._id,
    label: `${user.name}`,
  }));

  const handleFormChange = ({ target }) => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const handleFormBlur = ({ target }) =>
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));

  const handleFileAddition = (files) => {
    const uploadedFiles = Array.from(files).map((file) => ({
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
      fileObject: file,
    }));

    const updatedFiles = values.documents
      ? [...values.documents, ...uploadedFiles]
      : [...uploadedFiles];

    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        documents: updatedFiles,
      },
    }));
  };

  const handleFileRemoval = (indexToRemove) => {
    if (
      Array.isArray(values.documents) &&
      values.documents.length > 0 &&
      indexToRemove !== undefined
    ) {
      const updatedFiles = values.documents.filter(
        (_, index) => index !== indexToRemove
      );

      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          documents: updatedFiles,
        },
      }));
    } else {
      console.error("Error: No files found or indexToRemove is undefined");
    }
  };

  const handleAddProject = async () => {
    if (!values.title || !values.status) {
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "One or more fields are empty.",
      }));

      setTouched((prev) => ({
        ...prev,
        title: true,
        description: true,
        status: true,
        assignedTo: true,
      }));
      setShowModal(true);
      return;
    }
    // const { success, data, error } = await updateProject(values, token);

    // if (success) {
    //   setFormState(initFormState);
    //   setAssignedTo(null);
    //   setTouched((prev) => ({
    //     ...prev,
    //     title: false,
    //     description: false,
    //     status: false,
    //     assignedTo: false,
    //   }));
    //   setFormStatus(() => ({
    //     hasError: false,
    //     submitStatus: true,
    //     message: data.message,
    //   }));
    //   const fileInput = document.querySelector('input[type="file"]');
    //   if (fileInput) {
    //     fileInput.value = "";
    //   }
    //   setShowModal(true);
    // } else {
    //   setFormStatus(() => ({
    //     hasError: true,
    //     submitStatus: false,
    //     message: error,
    //   }));
    //   setShowModal(true);
    // }
  };

  return ( project &&
    <Layout
      MenuData={
        user.role === "admin"
          ? MenuData.admin
          : user.role === "employee"
          ? MenuData.employee
          : MenuData.client
      }
    >
      {console.log(project)}
      <section className="add-project">
        <div className="title">
          <h1 className="text-sm font-bold">Edit project</h1>
        </div>
        <div className="form-wrapper mt-10">
          <form
            className="add-project-form"
            name="add-project-form"
            action="POST"
          >
            <fieldset className="flex gap-x-10 w-full">
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={values.title}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
                className={`text-xxs py-2 border-0 border-b outline-none w-full text-primary  ${
                  touched.title && values.title === ""
                    ? "border-error text-error placeholder:text-error"
                    : "border-primary text-primary placeholder:text-primary"
                }`}
              />

              <select
                name="status"
                className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                  touched.status && values.status === ""
                    ? "border-error text-error"
                    : "border-primary text-primary "
                }`}
                value={values.status}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
              >
                <option
                  value=""
                  className={
                    touched.status && values.status === ""
                      ? " text-error"
                      : " text-primary "
                  }
                >
                  Select a status
                </option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="done">Done</option>
              </select>
            </fieldset>
            <fieldset className="flex gap-x-10 w-full mt-5">
              <select
                name="assignedEmail"
                className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                  touched.assignedEmail && values.assignedEmail === ""
                    ? "border-error text-error"
                    : "border-primary text-primary "
                }`}
                value={values.assignedEmail}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
              >
                <option
                  value=""
                  className={
                    touched.assignedEmail && values.assignedEmail === ""
                      ? " text-error"
                      : " text-primary "
                  }
                >
                  Assign an email conversation
                </option>
                {conversations &&
                  conversations.map((conversation, index) => (
                    <option key={index} value={conversation._id}>
                      {conversation.conversationName}
                    </option>
                  ))}
              </select>
              <Select
                value={assignedTo}
                onChange={handleassignedTo}
                name="assignedTo"
                classNames={{
                  menuButton: ({ isDisabled }) =>
                    `flex text-sm text-gray-500 border border-primary rounded shadow-none transition-all duration-300 focus:outline-none focus:border-0 text-xxs border-0 border-b rounded-none ${
                      isDisabled
                        ? "bg-gray-200 hover:border-gray-400"
                        : "bg-white hover:border-gray-400"
                    }`,
                  menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                  listItem: ({ isSelected }) =>
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-xxs ${
                      isSelected
                        ? `hidden`
                        : `text-gray-500 hover:bg-gray-100 hover:font-bold`
                    }`,
                }}
                placeholder="Assign project to"
                options={options}
                isMultiple={true}
              />
            </fieldset>
            <fieldset className="flex gap-x-10 w-full mt-5">
              <textarea
                type="text"
                name="description"
                rows={10}
                value={values.description}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
                placeholder="Project description"
                className="text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary"
              ></textarea>
            </fieldset>
            <fieldset
              className="mt-10"
              onDragOver={(event) => {
                event.preventDefault();
              }}
              onDrop={(event) => {
                event.preventDefault();
                handleFileAddition(event.dataTransfer.files);
              }}
            >
              <div className="border-dashed border-2 border-gray-300 p-10 flex flex-col items-center">
                <p className="text-sm font-bold mb-10">
                  Drag & Drop files here or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  name="documents"
                  onChange={(event) => {
                    event.preventDefault();
                    handleFileAddition(event.target.files);
                  }}
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer border rounded-lg py-2 px-4 border-primary text-primary hover:bg-primary hover:text-white group"
                >
                  <i className="fa-solid fa-plus bg-transparent group-hover:text-white"></i>
                </label>
              </div>
              <div className="mt-4">
                {values.documents.map((file, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 p-2 px-4 flex justify-between items-center mt-2"
                  >
                    <p>{file.originalname}</p>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        handleFileRemoval(index);
                      }}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
          </form>
          {formStatus && formStatus.hasError ? (
            <p className="text-error text-xxxs mt-5">{formStatus.message}</p>
          ) : formStatus && !formStatus.hasError && showModal ? (
            <NotificationModal
              title="Success"
              caption={formStatus.message}
              icon="fa-sharp fa-circle-check text-success"
              onClose={handleCloseModal}
            />
          ) : (
            ""
          )}
          <div className="button-wrapper flex justify-start mt-20">
            <a
              onClick={handleAddProject}
              className="cursor-pointer border border-primary rounded-md outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
            >
              Add new
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default EditProject;
