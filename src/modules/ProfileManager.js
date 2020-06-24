const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/users/${id}`).then((result) => result.json());
  },
  getAll() {
    return fetch(`${remoteURL}/users`).then((result) => result.json());
  },
  update(editedUser) {
    return fetch(`${remoteURL}/users/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    }).then((data) => data.json());
  },
};