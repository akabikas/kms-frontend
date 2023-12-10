import React from "react";

function Login() {
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
                name="username"
                id="username"
                placeholder="Username"
                className="text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary"
              />
            </fieldset>
            <fieldset className="mt-5">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="text-xxs py-2 border-0 border-b border-primary outline-none w-full placeholder:text-primary text-primary"
              />
            </fieldset>
            <fieldset className="mt-5">
              <a className="underline cursor-pointer hover:text-tertiary">
                Forget password?
              </a>
            </fieldset>
            <fieldset className="mt-5 flex justify-end">
              <button
                type="submit"
                id="btn-sign-in"
                className="border border-primary outline-none text-primary px-10 py-2 hover:bg-tertiary hover:border-tertiary hover:text-secondary"
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
