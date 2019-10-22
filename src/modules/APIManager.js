const remoteURL = "http://localhost:5002"

export default {
  getTrip(id) {
    return fetch(`${remoteURL}/trips/${id}?embed=users`).then(result => result.json())
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
  getTripSpecificPlace(id) {
    return fetch(`${remoteURL}/places?tripId=${id}`).then(result => result.json())
  },
  getTripAccomodations(id) {
    return fetch(`${remoteURL}/accomodations?tripId=${id}`).then(result => result.json())
  },
  getTripTransportation(id) {
    return fetch(`${remoteURL}/transportationLocations?tripId=${id}`).then(result => result.json())
  },
  getTripActivities(id) {
    return fetch(`${remoteURL}/activities?tripId=${id}`).then(result => result.json())
  }
}