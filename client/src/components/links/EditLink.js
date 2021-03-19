import React, {useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import UserLinksService from "../../services/links/UserLinksService";
import {AuthContext} from "../../services/auth/AuthContext";
import Message from "../ui/Message";
import * as iconDefs from "../../assets/iconDefs";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";

const EditLink = (props) => {
  let history = useHistory();
  const [link, setLink] = useState({url: "", title: "", icon: ""});
  const [message, setMessage] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    UserLinksService.getUserLinks().then((data) => {
      console.log(data.links);
      data.links.forEach((link) => {
        if (link._id == props.match.params.linkId) {
          setLink(link);
        }
      });
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    UserLinksService.updateLink(link).then((data) => {
      //console.log(data);
      const message = data.message;
      if (!message.msgError) {
        setMessage(message);
        //redirect to links page
        setTimeout(() => {
          history.push("/links");
        }, 2500);
      } else if (message.msgBody === "Unauthorized") {
        // if jwt expired or user is no longer authorized
        setMessage(message);
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        setTimeout(() => {
          history.push("/");
        }, 2500);
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
            <h2 className="my-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
              Edit link
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
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md
                text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
              >
                Update
              </button>
            </div>
          </form>

          {message ? <Message message={message}></Message> : null}
        </div>
      </div>
    </>
  );
};

export default EditLink;
