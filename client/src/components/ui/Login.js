import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../services/auth/AuthContext";
import AuthService from "../../services/auth/AuthService";
import Message from "./Message";

const Login = (props) => {
  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      console.log(data);
      const {user, isAuthenticated, message} = data;
      if (isAuthenticated) {
        console.log(user);
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/profile");
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto w-auto" src="/link.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or if you don't have an account
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
            >
              {" "}
              Signup
            </Link>
          </p>
        </div>
        <form className="mt-8" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Username"
                name="username"
                type="text"
                required
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Username"
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                onChange={onChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between"></div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-violet-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Log in
            </button>
          </div>
        </form>
        {message ? <Message message={message}></Message> : null}
      </div>
    </div>
  );
};
export default Login;
