import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import PlaceCard from "./PlaceCard"
import AddLocation from "./AddLocation"
import AddTravelers from "./AddTravelers"
import EditTripForm from "./EditTripForm"
import EditLocationForm from "./EditLocationForm"

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
            .then(() => APIManager.getTripPlaces(this.props.tripId)
                .then((places) => {
                    console.log(places)
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
    }
    getData = () => {
        const setNewState = {}
        APIManager.getTrip(this.props.tripId)
            .then((trip) => {
                setNewState.trip = trip
            })
            .then(() => APIManager.getTripPlaces(this.props.tripId)
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
    }

    render() {
        return (
            <>
                <div>
                    <h4>Title: {this.state.trip.title}</h4>
                    <p>Start Date: {this.state.trip.startDate}</p>
                    <p>End Date: {this.state.trip.endDate}</p>
                    <p>Notes: {this.state.trip.notes}</p>
                </div>

                {this.state.places.map(place =>
                    <PlaceCard key={place.id}
                        place={place}
                        placeId={place.id}

                    />
                )}
                {this.state.fellowTravelers.map(fellowTraveler =>
                    <div>
                        <p>Fellow Travelers: {fellowTraveler.travelerName}</p>
                    </div>
                )}
                <AddTravelers {...this.props} getData={this.getData} />

                <AddLocation {...this.props} getData={this.getData} />

                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push(`/trips/${this.props.trip.id}/edit`) }}>Edit Trip</button>

                <EditTripForm {...this.props} getData={this.getData} />

                <EditLocationForm {...this.props} getData={this.getData} />


                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default TripDetails