import React, {Component} from "react";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css";
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css";

const AddLink = () => {
  const icons = {
    "Users & People": [
      "fab fa-accessible-icon",
      "fas fa-address-book",
      "far fa-address-book",
      "fas fa-address-card",
      "far fa-address-card",
      "fas fa-bed",
      "fas fa-blind",
      "fas fa-child",
      "fas fa-female",
      "fas fa-frown",
      "far fa-frown",
      "fas fa-id-badge",
      "far fa-id-badge",
      "fas fa-id-card",
      "far fa-id-card",
      "fas fa-male",
      "fas fa-meh",
      "far fa-meh",
      "fas fa-power-off",
      "fas fa-smile",
      "far fa-smile",
      "fas fa-street-view",
      "fas fa-user",
      "far fa-user",
      "fas fa-user-circle",
      "far fa-user-circle",
      "fas fa-user-md",
      "fas fa-user-plus",
      "fas fa-user-secret",
      "fas fa-user-times",
      "fas fa-users",
      "fas fa-wheelchair",
    ],
    Vehicles: [
      "fab fa-accessible-icon",
      "fas fa-ambulance",
      "fas fa-bicycle",
      "fas fa-bus",
      "fas fa-car",
      "fas fa-fighter-jet",
      "fas fa-motorcycle",
      "fas fa-paper-plane",
      "far fa-paper-plane",
      "fas fa-plane",
      "fas fa-rocket",
      "fas fa-ship",
      "fas fa-shopping-cart",
      "fas fa-space-shuttle",
      "fas fa-subway",
      "fas fa-taxi",
      "fas fa-train",
      "fas fa-truck",
      "fas fa-wheelchair",
    ],
  };
  const props = {
    theme: "bluegrey",
    renderUsing: "className",
    isMulti: false,
  };

  const onSubmit = (e) => {
    console.log("fds");
  };

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
        <div className="max-w-md w-full">
          <div>
            {" "}
            <h2 className="my-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
              Add a new link to your card
            </h2>
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                icons={icons}
                value="fas fa-truck"
                id="icon"
                onChange={onChange}
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
        </div>
      </div>
    </>
  );
};

export default AddLink;
