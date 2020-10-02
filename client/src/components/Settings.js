import React from "react";

const Settings = () => {
  return (
    <div className="min-h-full  flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
      <div className="max-w-md w-full">
        <div>
          <h2 className="my-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
            Account Settings
          </h2>
        </div>
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
          <div className="rounded  shadow-md px-8 pt-6 pb-8 mb-4">
            Delete your account
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
