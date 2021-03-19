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
        return {message: {msgBody: "Unauthorized"}, msgError: true};
      }
    });
  },

  updateLink: (link) => {
    return fetch(`/editLink/${link._id}`, {
      method: "PATCH",
      body: JSON.stringify(link),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return {message: {msgBody: "Unauthorized"}, msgError: true};
      }
    });
  },

  deleteLink: (link) => {
    return fetch(`/deleteLink/${link._id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return {message: {msgBody: "Unauthorized"}, msgError: true};
      }
    });
  },
};
