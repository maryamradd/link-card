import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {DragDropContext} from "react-beautiful-dnd";
import UserLinksService from "./UserLinksService";
import Message from "./Message";
import DraggableUserLinks from "./DraggableUserLinks";

//TODO send new links order to backend

const UserLinks = () => {
  const [userLinks, setUserLinks] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    UserLinksService.getUserLinks().then((data) => {
      setUserLinks(data.links);
    });
    //console.log("userLinks: ", userLinks);
  }, []);

  // reorder the passed list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    //should update state to reflect dnd reordering
    if (!result.destination) {
      return;
    }

    const newLinks = reorder(
      userLinks,
      result.source.index,
      result.destination.index
    );
    setUserLinks(newLinks);
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
      <div className="max-w-xl w-full">
        <div>
          <h2 className="mt-4 mb-6  text-center text-3xl leading-9 font-extrabold text-gray-900">
            Your Links
          </h2>
          <p className="my-6 text-center text-md leading-5 text-gray-600">
            {userLinks.length === 0 ? "You don't have any links yet" : ""}
          </p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <DraggableUserLinks links={userLinks} />
        </DragDropContext>
        <div className="my-3 mx-14 ">
          <Link to="/add">
            <div className="border-2 border-dashed border-gray-400 text-gray-700 px-4 py-3 rounded relative hover:border-gray-600">
              <span className="absolute top-0 bottom-0 left-0 px-12 py-3">
                <i className="fas fa-plus"></i>
              </span>
              <span className="block text-center font-semibold ">
                Add a link
              </span>
            </div>
          </Link>
        </div>
      </div>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default UserLinks;
