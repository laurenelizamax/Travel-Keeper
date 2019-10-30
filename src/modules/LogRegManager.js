const remoteURL = "http://localhost:5002"

export default {
    createNewUser(user) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then (Response => Response.json())
    },
    getUserInfo() {
        return fetch(`${remoteURL}/users`)
            .then(data => data.json())
    },
    getOneUser(email) {
        return fetch(`${remoteURL}/users?email=${email}`).then(result => result.json())
    },
    getUserProfile(id) {
        return fetch(`${remoteURL}/users/${id}`).then(result => result.json())
    }
}