import React, { useState } from "react";

import SessionStorageService from "../../../../services/sessionStorage";
import NotificationModal from "../../modal/notificationModal";
import editPassword from "../../../../libs/auth/editPassword";

const initFormValues = {
  oldPass: "",
  newPass: "",
  confirmNewPass: "",
};

const initFormState = {
  values: initFormValues,
};

function ChangePass() {
  const token = SessionStorageService.getItem("token");
  const user = SessionStorageService.getItem("user");

  const [formState, setFormState] = useState(initFormState);
  const [touched, setTouched] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const { values } = formState;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!values.oldPass || !values.newPass || !values.confirmNewPass) {
      setTouched((prev) => ({
        ...prev,
        oldPass: true,
        newPass: true,
        confirmNewPass: true,
      }));
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "One or more fields are empty.",
      }));
      setShowModal(false);
      return;
    }
    if (values.newPass !== values.confirmNewPass) {
      setTouched((prev) => ({
        ...prev,
        oldPass: true,
        newPass: true,
        confirmNewPass: true,
      }));
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: "Password does not match",
      }));
      setShowModal(false);
      return;
    }

    const { success, data, error } = await editPassword(values, user._id, token);

    if (success) {
      setFormState(initFormState);
      setTouched((prev) => ({
        ...prev,
        oldPass: false,
        newPass: false,
        confirmNewPass: false,
      }));
      setFormStatus(() => ({
        hasError: false,
        submitStatus: true,
        message: data.message,
      }));

      SessionStorageService.setItem("user", data.user);

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
    <div className="password grid grid-cols-12 gap-x-10 mt-10">
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
              name="oldPass"
              placeholder="Current password"
              value={values.oldPass}
              onChange={handleFormChange}
              onBlur={handleFormBlur}
              className="border-b border-primary w-full outline-none py-2"
            ></input>
            <input
              type="password"
              name="newPass"
              value={values.newPass}
              onChange={handleFormChange}
              onBlur={handleFormBlur}
              placeholder="New password"
              className="border-b border-primary w-full outline-none py-2 mt-5"
            ></input>
            <input
              type="password"
              name="confirmNewPass"
              value={values.confirmNewPass}
              onChange={handleFormChange}
              onBlur={handleFormBlur}
              placeholder="Confirm new password"
              className="border-b border-primary w-full outline-none py-2 mt-5"
            ></input>
          </fieldset>
          <button
            onClick={handlePasswordChange}
            className="mt-10 px-10 py-2 rounded-md bg-primary text-white border-primary border hover:bg-transparent hover:text-primary"
          >
            Save
          </button>
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
      </div>
    </div>
  );
}

export default ChangePass;
