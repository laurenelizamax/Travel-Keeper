import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
import EditLocationForm from "./EditLocationForm"
import { Button } from "reactstrap"


class PlaceCard extends Component {
    state = {
        accommodations: [],
        transportations: [],
        activities: []
    }

    componentDidMount() {
        const newState = {}
        APIManager.getTripAccommodations(this.props.place.id)
            .then((lodging) => {
                newState.accommodations = lodging
            })

            .then(() => APIManager.getTripTransportation(this.props.place.id)
                .then((trans) => {
                    newState.transportations = trans
                })
            )
            .then(() => APIManager.getTripActivities(this.props.place.id)
                .then((activites) => {
                    newState.activities = activites
                })
            )
            .then(() => {
                this.setState(newState)
            })
    }

    render() {
        return (
            <>
                <div>
                    <p>Location: {this.props.place.placeName}</p>
                    <p>Description: {this.props.place.placeDescription}</p>
                    <Link to={`/places/${this.props.placeId}`}>Location Details</Link>
                    <EditLocationForm 
                            {...this.props} getData={this.props.getData} />
                    <Button color="danger" type="button" onClick={() => this.props.deleteLocation(this.props.place.id)}>Delete Location</Button>
                </div>

                {this.state.accommodations.map(accommodation =>
                    <div key={accommodation.id}>
                        <p>Accommodations: {accommodation.stayName}</p>
                        <p>Description: {accommodation.stayDescription}</p>
                    </div>
                )}

                {this.state.activities.map(activity =>
                    <div key={activity.id}>
                        <p>Activites: {activity.activityName}</p>
                        <p>Description: {activity.activityDescription}</p>
                    </div>
                )}

                {this.state.transportations.map(transportation =>
                    <div key={transportation.id}>
                        <p>Transportation: {transportation.transportationName}</p>
                        <p>Description: {transportation.transportationDescription}</p>

                    </div>
                )}

            </>
        )
    }
}
export default PlaceCard