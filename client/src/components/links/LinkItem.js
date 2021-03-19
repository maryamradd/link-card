import React from "react";

const LinkItem = ({link, primaryColor, backgroundColor}) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-0"
    >
      <div
        className="bg-gray-100 border  text-gray-700 px-4 py-3 rounded relative"
        style={{borderColor: primaryColor}}
      >
        <span className="absolute top-0 bottom-0 left-0 px-12 py-3">
          <i className={link.icon} style={{color: primaryColor}}></i>
        </span>
        <span className="block text-center">{link.title}</span>
      </div>
    </a>
  );
};

export default LinkItem;
