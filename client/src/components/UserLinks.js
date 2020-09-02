import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import LinkItem from "./LinkItem";
import UserLinksService from "./UserLinksService";
import Message from "./Message";

const UserLinks = (props) => {
  const [userLinks, setUserLinks] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    UserLinksService.getUserLinks().then((data) => {
      setUserLinks(data.links);
    });
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
      <div className="max-w-xl w-full">
        <div>
          <h2 className="mt-4 mb-6  text-center text-3xl leading-9 font-extrabold text-gray-900">
            Your Links
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            {!userLinks.length === 0 ? "You don't have any links yet" : ""}
          </p>
        </div>
        {userLinks.map((link) => {
          return (
            <div key={link._id} className="flex">
              <div className=" mt-6 mr-8 ">
                <i className="fas fa-bars text-gray-400 hover:text-gray-600"></i>
              </div>
              <div className="my-3 flex-auto">
                <LinkItem link={link}></LinkItem>
              </div>
              <div className=" mt-6 ml-8 ">
                <i className="fas fa-cog text-gray-400 hover:text-gray-600"></i>
              </div>
            </div>
          );
        })}
        <div className="my-3 mx-12 ">
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
