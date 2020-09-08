import React, {useState, useEffect} from "react";
import AvatarEditor from "react-avatar-editor";

import ProfileService from "./ProfileService";
import AvatarUploadService from "./AvatarUploadService";

const AvatarModal = (props) => {
  const [image, setImage] = useState(
    "https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png"
  );
  const [imageStyle, setImageStyle] = useState(true);
  const [scale, setScale] = useState(1);
  const [editor, setEditor] = useState(null);

  var borderRadius = imageStyle ? 110 : 0;
  useEffect(() => {
    ProfileService.getProfile().then((data) => {
      //console.log(data);
      //setImage(data.image.file);
      //setImageStyle(data.avatarImage);
    });
    setEditor(editor);
  }, []);

  const showHideClassName = props.show ? "block" : "hidden";
  const onAvatarChange = (e) => {
    setImageStyle(true);
  };

  const onBackgroundChange = (e) => {
    setImageStyle(false);
  };

  const handleNewImage = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    // console.log(scale);
    setScale(scale);
  };

  const onClickRemove = (e) => {
    setImage("");
  };

  const handleSave = (data) => {
    data.preventDefault();
    //console.log(data);
    const img = editor.getImageScaledToCanvas().toDataURL();
    console.log(img);
    setImage(image);
    setScale(scale);
    setImageStyle(imageStyle);
    // props.handleClose;
    console.log(image.name);
    console.log(image.type);
    const file = {file: image.name, mimetype: image.type};
    AvatarUploadService.updateAvatar(file).then((data) => {
      //  console.log(data);
    });
  };
  const setEditorRef = (editor) => setEditor(editor);
  return (
    <div className={showHideClassName}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg ">
        <span
          onClick={props.handleCloseModal}
          className="float-right relative top-4 right-6 text-gray-300 text-xl font-extrabold cursor-pointer hover:text-cool-gray-600  focus:text-cool-gray-600"
        >
          &times;
        </span>
        <div className="px-6 py-4 ">
          <form
            encType="multipart/form-data"
            method="patch"
            onSubmit={handleSave}
          >
            <AvatarEditor
              className="m-auto"
              ref={setEditorRef}
              image={image}
              width={220}
              height={220}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale}
              borderRadius={borderRadius}
            />
            <div className="flex mb-6">
              <label className="flex-1 justify-center px-4 py-2 mr-2 border border-transparent text-sm text-center leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                <input
                  className="hidden"
                  type="file"
                  name="imageFile"
                  onChange={handleNewImage}
                />
                Upload
              </label>
              <button
                className="flex-1 justify-center px-4 py-2 ml-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
                onClick={onClickRemove}
              >
                Remove
              </button>
            </div>
            <div className="mt-6 text-gray-700">Style your image:</div>{" "}
            <div className="mt-4 mb-6 text-center ">
              <div className="mt-4 mb-4">
                <span className="mr-2 text-md  font-medium">Zoom: </span>
                <input
                  name="scale"
                  type="range"
                  onChange={handleScale}
                  min="0.1"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                />
              </div>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="imageStyle"
                  value="avatar"
                  onChange={onAvatarChange}
                />
                <span className="ml-2 text-md  font-medium">Avatar</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="imageStyle"
                  value="background"
                  onChange={onBackgroundChange}
                />
                <span className="ml-2 text-md  font-medium">Background</span>
              </label>
            </div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
