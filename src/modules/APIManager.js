const remoteURL = "http://localhost:5002"

export default {
    getTrip(id) {
        return fetch(`${remoteURL}/trips/${id}`).then(result => result.json())
    },
    getAllTrips() {
        return fetch(`${remoteURL}/trips`).then(result => result.json())
    },

    postTrip(newTrip) {
        return fetch(`${remoteURL}/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrip)
        }).then(data => data.json())
    },
    postLocation(newLocation) {
        return fetch(`${remoteURL}/places`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLocation)
        }).then(data => data.json())
    },
    postProfile(newProfile) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        }).then(data => data.json())
    },
    delete(id) {
        return fetch(`http://localhost:5002/trips/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },

    updateTrip(editedTrip) {
        return fetch(`${remoteURL}/trips/${editedTrip.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTrip)
        }).then(data => data.json());
    },

    getTripSpecificPlace(id) {
        return fetch(`${remoteURL}/places?tripId=${id}`).then(result => result.json())
    },
    getTripAccommodations(id) {
        return fetch(`${remoteURL}/accommodations?placeId=${id}`).then(result => result.json())
    },
    getTripTransportation(id) {
        return fetch(`${remoteURL}/transportations?placeId=${id}`).then(result => result.json())
    },
    getTripActivities(id) {
        return fetch(`${remoteURL}/activities?placeId=${id}`).then(result => result.json())
    },
    getTripTravelers(id) {
        return fetch(`${remoteURL}/fellowTravelers?tripId=${id}`).then(result => result.json())
    }
}