import React, { useState } from "react";
import loginUser from "../../../libs/auth/loginUser";

const initFormValues = {
  email: "",
  password: "",
};

const initFormState = {
  values: initFormValues,
};

function Login() {
  const [formState, setFormState] = useState(initFormState);
  const [touched, setTouched] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const { values } = formState;

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched((prev) => ({
      ...prev,
      email: true,
      password: true,
    }));
    if (!values.email || !values.password) {
      return;
    }

    const { success, data, error } = await loginUser(values);

    if (success) {
      setFormState(initFormState);
      setFormStatus(() => ({
        hasError: false,
        submitStatus: true,
        message: "Sucess",
      }));
    } else {
      setFormStatus(() => ({
        hasError: true,
        submitStatus: false,
        message: error,
      }));
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="container px-6 md:mx-auto md:px-44 lg:px-60 xl:px-0 xl:w-[25%]">
        <div className="header flex flex-col items-center">
          <h1 className="text-base font-bold mb-2">Sign up</h1>
          <p className="text-xxs">
            Please provide your credentials to access your account.
          </p>
        </div>
        <div className="body mt-10">
          <form method="POST" action="" className="login-form">
            <fieldset>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={values.email}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
                className={`text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary ${
                  touched.email && values.email === ""
                    ? "border-error placeholder:text-error"
                    : ""
                }`}
              />
              {touched.email && values.email === "" ? (
                <p className="text-error mt-1 text-xxxs text-right">
                  Please enter your email
                </p>
              ) : (
                ""
              )}
            </fieldset>
            <fieldset className="mt-5">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleFormChange}
                onBlur={handleFormBlur}
                className={`text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary ${
                  touched.password && values.password === ""
                    ? "border-error placeholder:text-error"
                    : ""
                }`}
              />
              {touched.password && values.password === "" ? (
                <p className="text-error mt-1 text-xxxs text-right">
                  Please enter your password
                </p>
              ) : (
                ""
              )}
            </fieldset>
            <fieldset className="mt-5">
              <a className="underline cursor-pointer hover:text-tertiary">
                Forget password?
              </a>
            </fieldset>
            <fieldset className="mt-5 flex justify-between">
              {formStatus ? (
                <p
                  className={
                    formStatus.hasError
                      ? "text-error text-xxxs"
                      : "text-success text-xxxs"
                  }
                >
                  {formStatus.message}
                </p>
              ) : (
                ""
              )}
              <button
                type="submit"
                id="btn-sign-in"
                className="border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
