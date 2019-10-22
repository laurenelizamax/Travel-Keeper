import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import PlaceCard from "./PlaceCard"

class TripDetails extends Component {
    state = {
        trips: [],
        places: []
    }
    componentDidMount() {
        const setNewState = {}
        APIManager.getTrip()
            .then((trips) => {
                setNewState.trips = trips
            })
            .then(() => APIManager.getTripSpecificPlace()
                .then((places) => {
                    setNewState.places = places
                })
            )
            .then(() => APIManager.getTripAccomodations()
                .then((lodging) => {
                    setNewState.accomodations = lodging
                })
            )
            .then(() => APIManager.getTripTransportation()
                .then((trans) => {
                    setNewState.transportationLocations = trans
                })
            )
            .then(() => APIManager.getTripActivities()
                .then((activites) => {
                    setNewState.activities = activites
                })
            )
            .then(() => {
                this.setState(setNewState)
            })
    }

    render() {
        return (
            <>
                {this.state.places.map(place =>
                    <PlaceCard key={place.id} />
                    )}
                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default TripDetails