import React, { useState } from "react";

import MenuData from "../../assets/data/menu.json";
import Layout from "../shared/layout/component";

import UserIcon from "../../assets/img/user.png";
import registerUser from "../../libs/auth/registerUsers";
import SessionStorageService from "../../services/sessionStorage";

const initFormValues = {
  fullname: "",
  email: "",
  biography: "",
  password: "",
  confirmPassword: "",
  organisation: "",
  role: "",
  profilePicture: "",
};

const initFormState = {
  values: initFormValues,
};

function AddUser() {
  const [formState, setFormState] = useState(initFormState);
  const [touched, setTouched] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const { values } = formState;


  const token = SessionStorageService.getItem("token");

  const [profilePicture, setProfilePicture] = useState(UserIcon);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfilePicture(event.target.result);
        setFormState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            profilePicture: file,
          },
        }));
      };

      reader.readAsDataURL(file);
    }
  };

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

  const handleAddUser = async () => {

    if (
      !values.fullname ||
      !values.email ||
      !values.biography ||
      !values.password ||
      !values.confirmPassword ||
      !values.organisation ||
      !values.role ||
      !values.profilePicture
    ) {
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "One or more fields are empty.",
      }));

      setTouched((prev) => ({
        ...prev,
        fullname: true,
        email: true,
        biography: true,
        password: true,
        confirmPassword: true,
        organisation: true,
        role: true,
        profilePicture: true,
      }));
      return;
    } if(values.password !== values.confirmPassword){
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "Password does not match",
      }));

      setTouched((prev) => ({
        ...prev,
        fullname: true,
        email: true,
        biography: true,
        password: true,
        confirmPassword: true,
        organisation: true,
        role: true,
        profilePicture: true,
      }));
      return;
    }

    const { success, data, error } = await registerUser(values, token);
    if (success) {
      setFormState(initFormState);
      setTouched((prev) => ({
        ...prev,
        fullname: false,
        email: false,
        biography: false,
        password: false,
        confirmPassword: false,
        organisation: false,
        role: false,
        profilePicture: false,
      }));
      setFormStatus(() => ({
        hasError: false,
        submitStatus: true,
        message: data.message,
      }));
      setProfilePicture(UserIcon);
    } else {
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: error,
      }));
    }
  };

  const triggerFileClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();
  };

  return (
    <Layout MenuData={MenuData.admin}>
      <div>
        <h1 className="text-sm font-bold">Add user</h1>
        <div className="mt-20">
          <form
            className="grid grid-cols-24"
            name="adduser-form"
            action=""
            method="POST"
          >
            <div className="col-span-16">
              <fieldset className="flex gap-x-10 w-full">
                <input
                  type="text"
                  value={values.fullname}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  name="fullname"
                  placeholder="Full name"
                  className={`text-xxs py-2 border-0 border-b outline-none w-full text-primary ${
                    touched.fullname && values.fullname === ""
                      ? "border-error placeholder:text-error"
                      : "border-primary placeholder:text-primary "
                  }`}
                />

                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  placeholder="Email"
                  className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                    touched.email && values.email === ""
                      ? "border-error placeholder:text-error"
                      : "border-primary placeholder:text-primary "
                  }`}
                />
              </fieldset>
              <fieldset className="flex gap-x-10 w-full mt-5">
                <textarea
                  type="text"
                  name="biography"
                  rows={10}
                  value={values.biography}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  placeholder="Write biography"
                  className="text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary"
                ></textarea>
              </fieldset>
              <fieldset className="flex gap-x-10 w-full mt-5">
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  placeholder="Password"
                  className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                    touched.password && values.password === ""
                      ? "border-error placeholder:text-error"
                      : "border-primary placeholder:text-primary "
                  }`}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  placeholder="Confirm password"
                  className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                    touched.confirmPassword && values.confirmPassword === ""
                      ? "border-error placeholder:text-error"
                      : "border-primary placeholder:text-primary "
                  }`}
                />
              </fieldset>
              <fieldset className="flex gap-x-10 w-full mt-5">
                <select
                  name="role"
                  className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                    touched.role && values.role === ""
                      ? "border-error text-error"
                      : "border-primary text-primary "
                  }`}
                  value={values.role}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                >
                  <option
                    value=""
                    className={`${
                      touched.role && values.role === ""
                        ? "text-error"
                        : " text-primary "
                    }`}
                  >
                    Select a role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="client">Client</option>
                  <option value="employee">Employee</option>
                </select>

                <input
                  type="organisation"
                  name="organisation"
                  value={values.organisation}
                  onChange={handleFormChange}
                  onBlur={handleFormBlur}
                  placeholder="Organisation"
                  className={`text-xxs py-2 border-0 border-b  outline-none w-full text-primary  ${
                    touched.organisation && values.organisation === ""
                      ? "border-error placeholder:text-error"
                      : "border-primary placeholder:text-primary "
                  }`}
                />
              </fieldset>
            </div>
            <div className="col-span-8 overflow-hidden flex flex-col items-center relative">
              <input
                type="file"
                className="profilepicture w-60 h-60 rounded-full object-cover absolute invisible"
                name="profilePicture"
                onChange={handleFileChange}
              ></input>
              <img
                className="w-60 h-60 rounded-full object-cover cursor-pointer"
                onClick={triggerFileClick}
                src={profilePicture}
              />
              <p className="mt-5 font-bold">Profile picture</p>
            </div>
          </form>
          {formStatus ? (
            <p
              className={
                formStatus.hasError
                  ? "text-error text-xxxs mt-5"
                  : "text-success text-xxxs mt-5"
              }
            >
              {formStatus.message}
            </p>
          ) : (
            ""
          )}
          <div className="button-wrapper flex justify-start mt-20">
            <a
              onClick={handleAddUser}
              className="cursor-pointer border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
            >
              Add new
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddUser;
