import React, {useState, useContext, useRef} from "react";
import UserLinksService from "./UserLinksService";
import {AuthContext} from "./AuthContext";
import Message from "./Message";
import * as iconDefs from "../assets/iconDefs";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";

const AddLink = () => {
  const [link, setLink] = useState({url: "", title: "", icon: ""});
  const [message, setMessage] = useState(null);

  const authContext = useContext(AuthContext);
  //var timerId = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    UserLinksService.createLink(link).then((data) => {
      console.log(data);
      const message = data;
      if (!message.msgError) {
        setMessage(message);
        //redirect to links page
        /*    timerId = setTimeout(() => {
          props.history.push("/links");
        }, 3000); */
      } else if (message.msgBody === "unauth") {
        //maybe jwt expired or smthn
        console.log(message);
        setMessage(message);

        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        /*    timerId = setTimeout(() => {
          props.history.push("/");
        }, 3000); */
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    const {name, value} = e.target;
    setLink((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const iconOnChange = (e) => {
    setLink((prevState) => ({
      ...prevState,
      icon: e,
    }));
  };
  return (
    <>
      <div className="min-h-full  flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
        <div className="max-w-md w-full">
          <div>
            {" "}
            <h2 className="my-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
              Add a new link
            </h2>
          </div>
          <form
            className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="url"
              >
                Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="url"
                type="url"
                name="url"
                value={link.url}
                placeholder="e.g. https://twitter.com/username"
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                name="title"
                value={link.title}
                placeholder="e.g. my twitter"
                onChange={onChange}
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="url"
              >
                Icon
              </label>
              <FontIconPicker
                icons={iconDefs.fontAwesome}
                id="icon"
                name="icon"
                value={link.icon}
                isMulti={false}
                onChange={iconOnChange}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Add
              </button>
            </div>
          </form>

          {message ? <Message message={message}></Message> : null}
        </div>
      </div>
    </>
  );
};

export default AddLink;
