import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import AddLodging from "./AddLodging"
import AddActivities from "./AddActivities"
import AddTransportation from "./AddTransportation"
import EditLodgingForm from "./EditLodgingForm"
import EditActivityForm from "./EditActivityForm"
import EditTransportationForm from "./EditTransportationForm"

class LocationDetails extends Component {

    state = {
        place: "",
        accommodations: [],
        activities: [],
        transportations: []
    }
    componentDidMount() {
        const setNewState = {}
        APIManager.getTripSpecificPlace(this.props.tripId)
            .then((places) => {
                setNewState.places = places
            })
            .then(() => APIManager.postLocation(this.props.placeId)
                .then((accommodations) => {
                    setNewState.accommodations = accommodations
                })
            )
            .then(() => APIManager.postActivity(this.props.placeId)
                .then((activities) => {
                    setNewState.activities = activities
                })
            )
            .then(() => APIManager.postTransportation(this.props.placeId)
                .then((transportations) => {
                    setNewState.transportations = transportations
                })
            )
            .then(() => {
                this.setState(setNewState)
            })
    }
    getData = () => {
        const setNewState = {}
        APIManager.getTripSpecificPlace(this.props.tripId)
            .then((places) => {
                setNewState.places = places
            })
            .then(() => APIManager.postStay(this.props.placeId)
                .then((accommodations) => {
                    setNewState.accommodations = accommodations
                })
            ).then(() => APIManager.postActivity(this.props.placeId)
                .then((activities) => {
                    setNewState.activities = activities
                })
            ).then(() => APIManager.postTransportation(this.props.placeId)
                .then((transportations) => {
                    setNewState.transportations = transportations
                })
            ).then(() => {
                this.setState(setNewState)
            })
    }

    render() {
        return (
            <>
                <div>
                    <p>Location: {this.props.placeName}</p>
                    <p>Description: {this.props.placeDescription}</p>
                </div>

                {this.state.accommodations.map(accommodation =>
                    <div>
                        <p>Accommodations: {accommodation.stayName}</p>
                        <p>Description: {accommodation.stayDescription}</p>
                    </div>
                )}

                {this.state.activities.map(activity =>
                    <div>
                        <p>Activites: {activity.activityName}</p>
                        <p>Description: {activity.activityDescription}</p>
                    </div>
                )}

                {this.state.transportations.map(transportation =>
                    <div>
                        <p>Transportation: {transportation.transportationName}</p>
                        <p>Description: {transportation.transportationDescription}</p>

                    </div>
                )}

                <AddLodging  {...this.props} getData={this.getData} />

                <AddActivities  {...this.props} getData={this.getData} />

                <AddTransportation {...this.props} getData={this.getData} />


                <EditLodgingForm {...this.props} getData={this.getData} />

                <EditActivityForm {...this.props} getData={this.getData} />

                <EditTransportationForm {...this.props} getData={this.getData} />

                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default LocationDetails