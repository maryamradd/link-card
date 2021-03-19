import React, {useState, useEffect} from "react";
import AvatarEditor from "react-avatar-editor";
import ProfileService from "../../services/ProfileService";
import Message from "./Message";

const AvatarModal = (props) => {
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState({file: "", filename: "", mimetype: ""});
  const [imageStyle, setImageStyle] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0.5, y: 0.5});
  const [borderRadius, setBorderRadius] = useState(null);

  useEffect(() => {
    ProfileService.getProfile().then((data) => {
      setImage({
        file: data.image.file,
        filename: "",
        mimetype: data.image.mimetype,
      });
      setImageStyle(data.avatarImage);
    });

    var borderRadius = imageStyle ? 110 : 0;
    setBorderRadius(borderRadius);
    setEditor(editor);
  }, []);

  // classname to show or hide modal
  const showHideClassName = props.show ? "block" : "hidden";

  const handleNewImage = (e) => {
    if (e.target.files[0].size === undefined) {
      return;
    }
    if (e.target.files[0].size > 5000000) {
      setMessage({msgBody: " Image size is too big!", msgError: true});
      e.target.value = "";
    } else {
      setImage({
        file: e.target.files[0],
        filename: e.target.files[0].name,
        mimetype: e.target.files[0].type,
      });
    }
  };

  const onClickRemove = (e) => {
    setImage("");
  };

  // toggle between avatar or background image
  const onAvatarChange = (e) => {
    setBorderRadius(110);
    setImageStyle(true);
  };

  const onBackgroundChange = (e) => {
    setBorderRadius(0);
    setImageStyle(false);
  };

  // set editor
  const setEditorRef = (editor) => {
    setEditor(editor);
  };

  // editor zoom handler
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  // editor position handler
  const handlePositionChange = (position) => {
    setPosition(position);
  };

  // convert base64 to raw binary data held in a string
  const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  };

  // image upload handler
  const handleSave = (data) => {
    // retrive DataURL from editor
    const imgDataURL = editor.getImageScaledToCanvas().toDataURL();

    // convert to blob
    var newBlob = dataURItoBlob(imgDataURL);

    // create formData object using fieldname, blob, filename
    var newFD = new FormData();
    newFD.append("imageFile", newBlob, image.filename);

    // send formData object to backend to upload the image
    ProfileService.updateImage(newFD).then((data) => {
      setMessage(data.message);
    });

    // update the image stlye (avatar or backkground)
    ProfileService.updateImageStlye({avatarImage: imageStyle}).then((data) => {
      console.log(data);
    });
  };

  return (
    <div
      className={`absolute w-full max-w-md align-center z-50 
       bg-gray-50 py-6 px-6 sm:px-6 lg:px-6  ${showHideClassName}`}
    >
      <div className="absolute w-full left-0 rounded-lg overflow-hidden shadow-lg bg-white px-6 pt-4 pb-6">
        <span
          onClick={props.handleClose}
          className="float-right relative top-1 right-1 text-gray-300 text-xl font-extrabold cursor-pointer hover:text-cool-gray-600  focus:text-cool-gray-600"
        >
          &times;
        </span>
        <div className="mb-2">
          <AvatarEditor
            className="m-auto"
            ref={setEditorRef}
            image={image.file}
            width={200}
            height={200}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            borderRadius={borderRadius}
            onPositionChange={handlePositionChange}
          />
          <div className="flex mb-6">
            <label
              className="flex-1 justify-center px-4 py-2 mr-2 border border-transparent text-sm 
              text-center leading-5 font-medium rounded-md text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
            >
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
              <span className="mr-2 text-md font-medium">Zoom: </span>
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min="0.1"
                max="2"
                step="0.01"
                defaultValue="1"
                className="bg-red-500"
              />
            </div>

            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-cyan-600"
                name="imageStyle"
                value="avatar"
                onChange={onAvatarChange}
              />
              <span className="ml-2 text-md  font-medium">Avatar</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio  text-cyan-600"
                name="imageStyle"
                value="background"
                onChange={onBackgroundChange}
              />
              <span className="ml-2 text-md  font-medium">Background</span>
            </label>
          </div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium 
              rounded-md text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:border-violet-700 focus:shadow-outline-violet active:bg-violet-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        {message ? <Message message={message}></Message> : null}
      </div>
    </div>
  );
};

export default AvatarModal;
