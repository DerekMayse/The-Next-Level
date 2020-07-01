const remoteURL = "http://localhost:5002";

export default {
    getAll() {
        return fetch(`${remoteURL}/notes?_expand=game`).then((result) => result.json());
      },
      
      get(id) {
        return fetch(`${remoteURL}/notes/${id}`).then((result) => result.json());
      },
      post(newNote) {
        return fetch(`${remoteURL}/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        }).then((data) => data.json());
      },
      delete(id) {
        return fetch(`http://localhost:5002/notes/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      },
      update(editedNote) {
        return fetch(`${remoteURL}/notes/${editedNote.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedNote)
        }).then(data => data.json());
      }
    }