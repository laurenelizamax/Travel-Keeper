import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import PlaceCard from "./PlaceCard"

class TripDetails extends Component {

    state = {
        trip: "",
        places: [],
        accommodations: [],
        transportation: [],
        activities: []
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
    }


    activeUser = parseInt(sessionStorage.getItem("userId"))

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    addToNewTrip = evt => {
        evt.preventDefault();
        if (this.state.tripTitle === "" || this.state.startDate === "" || this.state.endDate === "" ||
            this.state.notes === "") {
            window.alert("Please add trip details");
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                title: this.state.tripTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                notes: this.state.notes,
                userId: this.activeUser,
            }

            APIManager.postTrip(trip)
                .then(() => {this.props.history.push("/")});
                // `/trips/${this.props.tripId}`
                // {<Link to={`/trips/${this.props.trip.id}`}></Link>}
        }
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
                    />

                )}
                {this.state.fellowTravelers.map(fellowTraveler =>
                    <div>
                        <p>Fellow Travelers: {fellowTraveler.name}</p>
                    </div>
                )}


                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push(`/trips/${this.props.animal.id}/edit`) }}>Edit Trip</button>

                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default TripDetails