import React from "react";

const LinkItem = () => {
  const icon = "fas fa-smile";
  const url = "http://google.com";
  const description = "Google";

  return (
    <>
      <a href="http://google.com" target="_blank">
        <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative">
          <span className="absolute top-0 bottom-0 left-0 px-12 py-3">
            <i className="fas fa-user"></i>
          </span>
          <span className="block text-center">{description}</span>
        </div>
      </a>
    </>
  );
};

export default LinkItem;
