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
};
