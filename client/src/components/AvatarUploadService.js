export default {
  /*   getAvatar: () => {
    return fetch("/profile", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  }, */

  updateAvatar: (avatarData) => {
    console.log(avatarData);
    return fetch("/profile/upload", {
      method: "PATCH",
      body: JSON.stringify(avatarData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },
};
