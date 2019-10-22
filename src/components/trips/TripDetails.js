import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import PlaceCard from "./PlaceCard"

class TripDetails extends Component {

    state = {
        trip: "",
        places: [],
        fellowTravelers: []
    }
    componentDidMount() {
        const setNewState = {}
        APIManager.getTrip(this.props.tripId)
            .then((trip) => {
                setNewState.trip = trip
            })
            .then(() => APIManager.getTripSpecificPlace(this.props.tripId)
                .then((places) => {
                    setNewState.places = places
                })
            ).then(() => APIManager.getTripTravelers(this.props.tripId)
                .then((travelers) => {
                    setNewState.fellowTravelers = travelers
                })
            )
            .then(() => {
                this.setState(setNewState)
            })
            console.log("potato")
    }

    render() {
        console.log("tripdetails rendering")
        return (
            <>
                <div>
                        <h4>Title: {this.state.trip.title}</h4>
                        <p>Start Date: {this.state.trip.startDate}</p>
                        <p>End Date: {this.state.trip.endDate}</p>
                    </div>



                {this.state.places.map(place =>
                    <PlaceCard key={place.id}
                        place={place}
                    />

                )}
                {this.state.fellowTravelers.map(fellowTraveler =>
                    <div>
                        <p>Fellow Travelers: {fellowTraveler.name}</p>
                    </div>
                )}

                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default TripDetails