import React from "react";

const LinkItem = (props) => {
  return (
    <a
      href={props.link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-0"
    >
      <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative">
        <span className="absolute top-0 bottom-0 left-0 px-12 py-3">
          <i className={props.link.icon}></i>
        </span>
        <span className="block text-center">{props.link.title}</span>
      </div>
    </a>
  );
};

export default LinkItem;
