const remoteURL = "http://localhost:5002";

export default {

  getAll() {
    return fetch(`${remoteURL}/consoles`).then((result) => result.json());
  }
}