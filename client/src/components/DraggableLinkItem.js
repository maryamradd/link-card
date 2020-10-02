import React, {useState, useContext} from "react";
import UserLinksService from "./UserLinksService";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import Message from "./Message";
import LinkItem from "./LinkItem";

// TODO detect click outside settings menu to hide it
// TODO change  history.go(0) to smtn that rerenders links component

const DraggableLinkItem = (props) => {
  let history = useHistory();
  const [settingsOpen, setSettingsOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState(null);

  const authContext = useContext(AuthContext);

  const deleteLinkHandler = () => {
    UserLinksService.deleteLink(props.link).then((data) => {
      const message = data.message;
      if (!message.msgError) {
        setMessage(message);
        setTimeout(() => {
          history.go(0);
        }, 3000);
      } else if (message.msgBody === "Unauthorized") {
        // if jwt expired or user is no longer authorized
        setMessage(message);
        authContext.setUser({username: ""});
        authContext.setIsAuthenticated(false);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <>
      <div
        className={
          (confirmDelete ? "fixed " : "hidden ") +
          "z-50 w-full h-full overflow-auto left-0 top-0 pt-60 bg-gray-50 bg-opacity-75"
        }
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-xs my-0 mx-auto"><h3 class="text-lg leading-6 font-medium text-gray-900">
              Delete Link
            </h3>
          <p className="mt-4 mb-6 text-gray-600">Are you sure you want to delete this link?</p>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 rounded bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red" onClick={deleteLinkHandler}
            >
              Delete
            </button>
            <button
              className="bg-white hover:bg-gray-50 font-bold text-sm text-gray-400
          py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="max-w-xs mt-4 mx-auto">
          {message ? <Message message={message} /> : null}
        </div>
      </div>
      <div
        className="flex relative justify-end"
        ref={props.draggable.innerRef}
        {...props.draggable.draggableProps}
      >
        <div className="mt-3 mr-2">
          <i
            className="fas fa-bars text-gray-400 hover:text-gray-600 py-4 px-4"
            {...props.draggable.dragHandleProps}
          ></i>
        </div>
        <div className="my-3 flex-auto">
          <LinkItem link={props.link}></LinkItem>
        </div>
        <div className="mt-3 mr-2">
          <i
            className="fas fa-cog cursor-pointer text-gray-400 hover:text-gray-600 py-4 px-4"
            onClick={() => setSettingsOpen(!settingsOpen)}
          ></i>
        </div>

        {/* links settings popup */}

        <div
          className={
            (settingsOpen ? " absolute " : " hidden ") +
            "z-40 mt-12 mr-6  w-22 rounded-md shadow-lg"
          }
        >
          <Link to={{pathname: "/editLink/" + props.link._id}}>
            <div
              className="py-1 px-4 rounded-t-md bg-white shadow-xs hover:bg-gray-50 cursor-pointer"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              Edit
            </div>
          </Link>
          <div
            className="py-1 px-4 rounded-b-md bg-white shadow-xs hover:bg-gray-50 cursor-pointer text-red-600 font-semibold"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
            onClick={() => setConfirmDelete(!confirmDelete)}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
};

export default DraggableLinkItem;
