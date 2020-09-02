export default {
  getUserLinks: () => {
    return fetch("/links").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return {isAuthenticated: false, user: {username: ""}};
    });
  },

  createLink: (link) => {
    return fetch("/addLink", {
      method: "post",
      body: JSON.stringify(link),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return {message: {msgBody: "unauth"}, msgError: true};
      }
    });
  },
};
