const remoteURL = "http://localhost:5002";

export default {

  getAll() {
    return fetch(`${remoteURL}/statuses`).then((result) => result.json());
  }
}