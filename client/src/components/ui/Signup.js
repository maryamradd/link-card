import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import AuthService from "../../services/auth/AuthService";
import Message from "./Message";

const Signup = (props) => {
  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  var timerId = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.signup(user).then((data) => {
      const {message} = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerId = setTimeout(() => {
          props.history.push("/login");
        }, 3000);
      }
    });
  };

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const resetForm = () => {
    setUser({username: "", password: ""});
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto w-auto" src="/link.png" alt="Link logo" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or if you already have an account
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              {" "}
              Log in
            </Link>
          </p>
        </div>
        <form className="mt-8" onSubmit={onSubmit}>
          <input type="hidden" name="remember" value="true" />
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white  bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
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
              Sign up
            </button>
          </div>
        </form>
        {message ? <Message message={message}></Message> : null}
      </div>
    </div>
  );
};
export default Signup;
