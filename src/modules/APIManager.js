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
    postStay(newStay) {
        return fetch(`${remoteURL}/accommodations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStay)
        }).then(data => data.json())
    },
    postTraveler(newTraveler) {
        return fetch(`${remoteURL}/fellowTravelers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTraveler)
        }).then(data => data.json())
    },

    postActivity(newActivity) {
        return fetch(`${remoteURL}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivity)
        }).then(data => data.json())
    },
    postTransportation(newTransportation) {
        return fetch(`${remoteURL}/transportations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTransportation)
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
    updateLocation(editedLocation) {
        return fetch(`${remoteURL}/places/${editedLocation.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedLocation)
        }).then(data => data.json());
    },
    updateStay(editedStay) {
        return fetch(`${remoteURL}/accommodations/${editedStay.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedStay)
        }).then(data => data.json());
    },
    updateActivity(editedActivity) {
        return fetch(`${remoteURL}/activities/${editedActivity.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedActivity)
        }).then(data => data.json());
    },
    updateTransportation(editedTransportation) {
        return fetch(`${remoteURL}/transportations/${editedTransportation.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTransportation)
        }).then(data => data.json());
    },
    updateTraveler(editedTraveler) {
        return fetch(`${remoteURL}/fellowTravelers/${editedTraveler.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTraveler)
        }).then(data => data.json());
    },

    getTripPlaces(id) {
        return fetch(`${remoteURL}/places?tripId=${id}`).then(result => result.json())
    },
    getOnePlace(id) {
        return fetch(`${remoteURL}/places/${id}`).then(result => result.json())
    },
    getTripAccommodations(id) {
        return fetch(`${remoteURL}/accommodations?placeId=${id}`).then(result => result.json())
    },
    getOneAccommodation(id) {
        return fetch(`${remoteURL}/accommodations/${id}`).then(result => result.json())
    },
    getTripTransportation(id) {
        return fetch(`${remoteURL}/transportations?placeId=${id}`).then(result => result.json())
    },
    getOneTransportation(id) {
        return fetch(`${remoteURL}/transportations/${id}`).then(result => result.json())
    },
    getTripActivities(id) {
        return fetch(`${remoteURL}/activities?placeId=${id}`).then(result => result.json())
    },
    getOneActivity(id) {
        return fetch(`${remoteURL}/activities/${id}`).then(result => result.json())
    },
    getTripTravelers(id) {
        return fetch(`${remoteURL}/fellowTravelers?tripId=${id}`).then(result => result.json())
    },
    getOneTraveler(id) {
        return fetch(`${remoteURL}/fellowTravelers/${id}`).then(result => result.json())
    }
}