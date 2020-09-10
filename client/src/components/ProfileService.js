export default {
  getProfile: () => {
    return fetch("/profile", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },

  updateProfile: (profileData) => {
    console.log(profileData);
    return fetch("/profile", {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },

  updateImage: (imageData) => {
    console.log("imageData from upload service " + imageData);
    return fetch("/profile/upload", {
      method: "PATCH",
      body: imageData,
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },
  updateImageStlye: (imageStlye) => {
    console.log(imageStlye);
    return fetch("/profile/upload", {
      method: "PUT",
      body: JSON.stringify(imageStlye),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },
};
