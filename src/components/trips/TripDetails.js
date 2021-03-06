import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import PlaceCard from "./PlaceCard"
import AddLocation from "./AddLocation"
import AddTravelers from "./AddTravelers"
import EditTripForm from "./EditTripForm"
import EditTravelersForm from "./EditTravelersForm"
import "./TripList.css"

class TripDetails extends Component {

    state = {
        trip: "",
        places: [],
        fellowTravelers: [],
        fellowTraveler: "",
        modal: false
    }
    componentDidMount() {
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

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    deleteLocation = id => {
        APIManager.deleteLocation(id)
            .then(() => {
                APIManager.getTripPlaces(this.props.tripId)
                    .then((allPlaces) => {
                        this.setState({
                            places: allPlaces
                        })
                    })
            })
    }
    deleteTraveler = id => {
        APIManager.deleteTraveler(id)
            .then(() => {
                APIManager.getTripTravelers(this.props.tripId)
                    .then((allTravelers) => {
                        this.setState({
                            travelers: allTravelers,
                            fellowTraveler: ""
                        })
                    })
            })
        this.getData();
    }


    render() {
        return (
            <>
                <button type="button" className="profileButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

                <AddTravelers {...this.props} getData={this.getData} />

                <AddLocation {...this.props} getData={this.getData} />

                <div className="container-cards">
                    <div className="card">
                        <div className="card-content">
                            <div>
                                <h4><strong>Title: </strong>{this.state.trip.title}</h4>
                                <p><strong>Start Date: </strong>{this.state.trip.startDate}</p>
                                <p><strong>End Date: </strong>{this.state.trip.endDate}</p>
                                <p><strong>Notes:</strong> {this.state.trip.notes}</p>
                                <EditTripForm {...this.props} getData={this.getData} />
                            </div>
                            {this.state.fellowTravelers.map(fellowTraveler =>
                                <div key={fellowTraveler.id}>
                                    <p><strong>Fellow Traveler: </strong>{fellowTraveler.travelerName}</p>
                                    <EditTravelersForm fellowTravelerId={fellowTraveler.id} {...this.props} getData={this.getData} />
                                    <button className="deleteButton" type="button" onClick={() =>
                                        this.deleteTraveler(fellowTraveler.id)}>Delete Traveler</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container-cards">
                    {this.state.places.map(place =>
                        // <div key={place.id}>
                        <PlaceCard
                            key={place.id}
                            place={place}
                            placeId={place.id}
                            tripId={this.state.trip.id}
                            getData={this.getData}
                            deleteLocation={this.deleteLocation}
                        />
                    )}
                </div>
            </>
        )
    }
}
export default TripDetails