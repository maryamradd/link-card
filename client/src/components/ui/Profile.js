import React, {useState, useContext, useEffect} from "react";

import {useHistory} from "react-router-dom";
import {AuthContext} from "../../services/auth/AuthContext";
import Message from "./Message";
import ProfileService from "../../services/ProfileService";
import reactCSS from "reactcss";
import {SketchPicker} from "react-color";

import AvatarModal from "./AvatarModal";

const Profile = () => {
  let history = useHistory();
  const [profile, setProfile] = useState({
    image: {file: "uploads\\default.png"},
    displayName: "",
    bio: "",
    primaryColor: "",
    backgroundColor: "",
  });

  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  // modal handlers
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e) => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    setShowModal(false);
  };

  // Primary color picker
  const [displayColorPickerPR, setDisplayColorPickerPR] = useState(false);
  const [colorPR, setColorPR] = useState({hex: "#333"});

  // Background color picker
  const [displayColorPickerBG, setDisplayColorPickerBG] = useState(false);
  const [colorBG, setColorBG] = useState({
    hex: "#000000",
  });

  // Color picker style
  var styles = reactCSS({
    default: {
      width: 500,
      colorPR: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: colorPR.hex,
      },
      colorBG: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: colorBG.hex,
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

  useEffect(() => {
    ProfileService.getProfile().then((data) => {
      // console.log(data);
      setProfile(data);
      setColorPR({hex: data.primaryColor});
      setColorBG({hex: data.backgroundColor});
    });
  }, []);

  // Primary color picker handlers
  const handleClickPR = () => {
    setDisplayColorPickerPR(!displayColorPickerPR);
  };

  const handleClosePR = () => {
    setDisplayColorPickerPR(false);
  };

  const handleChangePR = (colorPR) => {
    setColorPR({
      hex: colorPR.hex,
    });

    setProfile((prevState) => ({
      ...prevState,
      primaryColor: colorPR.hex,
    }));
  };

  // Background color picker handlers
  const handleClickBG = () => {
    setDisplayColorPickerBG(!displayColorPickerBG);
  };

  const handleCloseBG = () => {
    setDisplayColorPickerBG(false);
  };

  const handleChangeBG = (colorBG) => {
    setColorBG({hex: colorBG.hex});

    setProfile((prevState) => ({
      ...prevState,
      backgroundColor: colorBG.hex,
    }));
  };

  const onChange = (e) => {
    const {name, value} = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ProfileService.updateProfile(profile).then((data) => {
      const message = data.message;
      if (!message.msgError) {
        setMessage(message);
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
      <div className="min-h-full z-0 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-6">
        <div className="max-w-md w-full">
          <h2 className="mt-8 text-center text-2xl leading-9 font-extrabold text-gray-900">
            {!profile.displayName
              ? "@" + profile.username
              : profile.displayName}
          </h2>

          <AvatarModal
            className="z-1"
            show={showModal}
            handleClose={handleCloseModal}
          ></AvatarModal>
          <form
            className="bg-white rounded-lg px-8 pt-6 pb-8 mt-6 mb-4"
            onSubmit={onSubmit}
          >
            <div
              className="mb-4 items-center justify-center text-center cursor-pointer"
              onClick={handleShowModal}
            >
              <span className="fa-stack fa-2x absolute mt-16 ml-16 text-gray-800 text-sm">
                <i className="fas fa-circle fa-stack-2x "></i>
                <i className="fas fa-upload fa-stack-1x fa-inverse"></i>
              </span>

              <img
                className="-ml-1  border-2 border-dotted p-1 inline-block h-24 w-24 rounded-full text-white shadow-solid"
                src={profile.image.file}
                alt="user profile picture"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="displayName"
              >
                Display name
              </label>
              <input
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                name="displayName"
                value={profile.displayName}
                type="text"
                placeholder="Add your display name"
                onChange={onChange}
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
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bio"
                name="bio"
                value={profile.bio}
                type="text"
                placeholder="Add your bio"
                onChange={onChange}
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
                  <div style={styles.swatch} onClick={handleClickPR}>
                    <div style={styles.colorPR} />
                  </div>
                  {displayColorPickerPR ? (
                    <div style={styles.popover}>
                      <div style={styles.cover} onClick={handleClosePR} />
                      <SketchPicker color={colorPR} onChange={handleChangePR} />
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
                  <div style={styles.swatch} onClick={handleClickBG}>
                    <div style={styles.colorBG} />
                  </div>
                  {displayColorPickerBG ? (
                    <div style={styles.popover}>
                      <div style={styles.cover} onClick={handleCloseBG} />
                      <SketchPicker color={colorBG} onChange={handleChangeBG} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <button
                /* onclick open userpage */
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:border-cyan-700 focus:shadow-outline-cyan active:bg-cyan-700"
              >
                Preview
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
              >
                Save
              </button>
            </div>
          </form>
          {message ? <Message message={message}></Message> : null}
        </div>
      </div>
    </>
  );
};

export default Profile;
