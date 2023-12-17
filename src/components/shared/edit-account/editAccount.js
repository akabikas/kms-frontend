import React, { useState } from "react";

import MenuData from "../../../assets/data/menu.json";
import Layout from "../layout/component";
import SessionStorageService from "../../../services/sessionStorage";
import editUser from "../../../libs/auth/editUser";
import NotificationModal from "../modal/notificationModal";
import editAvatar from "../../../libs/auth/editAvatar";

function EditAccount() {
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  const [currentUserData, setCurrentUserData] = useState(user);

  const initFormPersonalValues = {
    fullname: currentUserData.name,
    email: currentUserData.email,
    biography: currentUserData.biography,
  };

  const initFormPersonalState = {
    values: initFormPersonalValues,
  };

  const [formState, setFormState] = useState(initFormPersonalState);
  const [touched, setTouched] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const { values } = formState;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [profilePicture, setProfilePicture] = useState(
    `http://localhost:3000/${currentUserData.profilePicture}`
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        setProfilePicture(event.target.result);

        const { success, data, error } = await editAvatar(
          file,
          user._id,
          token
        );

        if (success) {
          setFormStatus(() => ({
            hasError: false,
            submitStatus: true,
            message: data.message,
          }));

          SessionStorageService.setItem("user", data.user);
          setCurrentUserData(data.user);
          setShowModal(true);
        } else {
          setFormStatus(() => ({
            hasError: true,
            submitStatus: false,
            message: error,
          }));
          setShowModal(true);
        }
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

  const triggerFileClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.click();
  };

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();

    if (!values.fullname || !values.email || !values.biography) {
      setTouched((prev) => ({
        ...prev,
        fullname: true,
        email: true,
        biography: true,
      }));
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "One or more fields are empty.",
      }));
      setShowModal(true);
      return;
    }

    const { success, data, error } = await editUser(values, user._id, token);

    if (success) {
      setFormState(initFormPersonalState);
      setTouched((prev) => ({
        ...prev,
        fullname: false,
        email: false,
        biography: false,
      }));
      setFormStatus(() => ({
        hasError: false,
        submitStatus: true,
        message: data.message,
      }));

      SessionStorageService.setItem("user", data.user);
      setCurrentUserData(data.user);
      const updatedFormValues = {
        fullname: data.user.name,
        email: data.user.email,
        biography: data.user.biography,
      };
      setFormState({
        values: updatedFormValues,
      });
      setShowModal(true);
    } else {
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: error,
      }));
      setShowModal(true);
    }
  };

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
      <section>
        <div>
          <h1 className="text-sm font-bold">Edit account information</h1>
        </div>
        <div className="mt-20">
          <div className="personal grid grid-cols-12 gap-x-10">
            <div className="col-span-3">
              <h2 className="text-xs font-bold">Personal Information</h2>
              <p className="text-xxs text-gray-400 mt-2">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-6">
              <fieldset className="mb-10">
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                    src={profilePicture}
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  ></img>
                  <div>
                    <button
                      type="button"
                      className="px-10 py-2 rounded-sm bg-primary text-white border-primary border hover:bg-transparent hover:text-primary"
                      onClick={triggerFileClick}
                    >
                      Change avatar
                    </button>
                    <input
                      type="file"
                      className="profilepicture hidden"
                      name="profilePicture"
                      onChange={handleFileChange}
                    ></input>
                    <p className="mt-2 text-xxxs leading-5 text-gray-400 bg-transparent">
                      JPG or PNG. 10MB max.
                    </p>
                  </div>
                </div>
              </fieldset>
              <form className="updatePersonalInfo" name="updatePersonalInfo">
                <fieldset className="flex gap-x-5">
                  <input
                    type="text"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    placeholder="Full name"
                    className="border-b border-primary w-full outline-none py-2"
                  ></input>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    placeholder="Email"
                    disabled
                    className="border-b w-full outline-none py-2 text-gray-400 border-gray-400"
                  ></input>
                </fieldset>
                <fieldset className="mt-10">
                  <textarea
                    name="biography"
                    rows={10}
                    value={values.biography}
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    placeholder="Your biography"
                    className="border-b border-primary w-full outline-none"
                  ></textarea>
                </fieldset>
                <button
                  onClick={handleSavePersonalInfo}
                  className="mt-10 px-10 py-2 rounded-sm bg-primary text-white border-primary border hover:bg-transparent hover:text-primary"
                >
                  Save
                </button>
              </form>
              {formStatus && formStatus.hasError ? (
                <p className="text-error text-xxxs mt-5">
                  {formStatus.message}
                </p>
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
            </div>
          </div>
          <div className="password grid grid-cols-12 gap-x-10 mt-20">
            <div className="col-span-3">
              <h2 className="text-xs font-bold">Change password</h2>
              <p className="text-xxs text-gray-400 mt-2">
                Update your password associated with your account.
              </p>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-6">
              <form className="updatePassword" name="updatePassword">
                <fieldset>
                  <input
                    type="password"
                    name="currentPass"
                    placeholder="Current password"
                    className="border-b border-primary w-full outline-none py-2"
                  ></input>
                  <input
                    type="password"
                    name="newPass"
                    placeholder="New password"
                    className="border-b border-primary w-full outline-none py-2 mt-5"
                  ></input>
                  <input
                    type="password"
                    name="confirmNewPass"
                    placeholder="Confirm new password"
                    className="border-b border-primary w-full outline-none py-2 mt-5"
                  ></input>
                </fieldset>
                <button className="mt-10 px-10 py-2 rounded-sm bg-primary text-white border-primary border hover:bg-transparent hover:text-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default EditAccount;
