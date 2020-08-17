import React, {Component, useState} from "react";
import reactCSS from "reactcss";
import {SketchPicker} from "react-color";

const Profile = () => {
  //Primary color picker
  const [displayColorPickerPR, setDisplayColorPickerPR] = useState(false);
  const [colorPR, setColorPR] = useState({
    r: "41",
    g: "12",
    b: "19",
    a: "1",
  });
  //Background color picker
  const [displayColorPickerBG, setDisplayColorPickerBG] = useState(false);
  const [colorBG, setColorBG] = useState({
    r: "41",
    g: "12",
    b: "19",
    a: "1",
  });

  //Color picker style
  var styles = reactCSS({
    default: {
      colorPR: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${colorPR.r}, ${colorPR.g}, ${colorPR.b}, ${colorPR.a})`,
      },
      colorBG: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${colorBG.r}, ${colorBG.g}, ${colorBG.b}, ${colorBG.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  // Primary color picker handlers
  const handleClickPR = () => {
    setDisplayColorPickerPR(!displayColorPickerPR);
  };

  const handleClosePR = () => {
    setDisplayColorPickerPR(false);
  };

  const handleChangePR = (colorPR) => {
    setColorPR({
      r: colorPR.rgb.r,
      g: colorPR.rgb.g,
      b: colorPR.rgb.b,
      a: colorPR.rgb.a,
    });
  };

  // Background color picker handlers
  const handleClickBG = () => {
    setDisplayColorPickerBG(!displayColorPickerBG);
  };

  const handleCloseBG = () => {
    setDisplayColorPickerBG(false);
  };

  const handleChangeBG = (colorBG) => {
    setColorBG({
      r: colorBG.rgb.r,
      g: colorBG.rgb.g,
      b: colorBG.rgb.b,
      a: colorBG.rgb.a,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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
            <h2 className="mt-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
              nAME GOES HERE
            </h2>
          </div>
          <form
            className="bg-white  rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(event) => onSubmit(event)}
          >
            <div className="mb-4 items-center justify-center text-center ">
              <span
                className="fa-stack fa-2x absolute mt-16 ml-16 text-gray-800"
                style={{fontSize: 12}}
              >
                <i className="fas fa-circle fa-stack-2x "></i>
                <i className="fas fa-upload fa-stack-1x fa-inverse"></i>
              </span>

              <img
                className="-ml-1  border-2 border-dotted p-1 inline-block h-24 w-24 rounded-full text-white shadow-solid"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Display name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Add your display name"
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bio"
                type="text"
                placeholder="Add your bio"
                onChange={(event) => onChange(event)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="colorPR"
                >
                  Primary color
                </label>

                <div>
                  <div
                    style={styles.swatch}
                    onClick={(event) => handleClickPR(event)}
                  >
                    <div style={styles.colorPR} />
                  </div>
                  {displayColorPickerPR ? (
                    <div style={styles.popover}>
                      <div
                        style={styles.cover}
                        onClick={(event) => handleClosePR(event)}
                      />
                      <SketchPicker
                        color={colorPR}
                        onChange={(event) => handleChangePR(event)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="colroBG"
                >
                  Background color
                </label>

                <div>
                  <div
                    style={styles.swatch}
                    onClick={(event) => handleClickBG(event)}
                  >
                    <div style={styles.colorBG} />
                  </div>
                  {displayColorPickerBG ? (
                    <div style={styles.popover}>
                      <div
                        style={styles.cover}
                        onClick={(event) => handleCloseBG(event)}
                      />
                      <SketchPicker
                        color={colorBG}
                        onChange={(event) => handleChangeBG(event)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <button
                /* onclick open userpage */
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Preview
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
