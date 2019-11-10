import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
import EditLocationForm from "./EditLocationForm"
import "./TripList.css"



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
                <div className="card">
                    <div className="card-content">
                        <h4>Location Details</h4>
                        <p><strong>Location: </strong>{this.props.place.placeName}</p>
                        <p><strong>Description: </strong>{this.props.place.placeDescription}</p>

                        <EditLocationForm
                            {...this.props} getData={this.props.getData} />

                        <button className="deleteButton" type="button"
                            onClick={() => this.props.deleteLocation(this.props.place.id)}>Delete Location</button>

                        <Link to={`/places/${this.props.placeId}`}><button className="detailsButton"> Location Details</button></Link>

                        {this.state.accommodations.map(accommodation =>
                            <div key={accommodation.id}>
                                <h5>Where You Stayed</h5>
                                <p><strong>Accommodation:</strong> {accommodation.stayName}</p>
                                <p><strong>Description: </strong>{accommodation.stayDescription}</p>
                            </div>
                        )}

                        {this.state.activities.map(activity =>
                            <div key={activity.id}>
                                <h5>What You Did</h5>
                                <p><strong>Activity:</strong> {activity.activityName}</p>
                                <p><strong>Description:</strong> {activity.activityDescription}</p>
                            </div>
                        )}

                        {this.state.transportations.map(transportation =>
                            <div key={transportation.id}>
                                <h5>How You Got There</h5>
                                <p><strong>Transportation:</strong> {transportation.transportationName}</p>
                                <p><strong>Description: </strong>{transportation.transportationDescription}</p>

                            </div>
                        )}
                    </div>
                </div>
            
            </>
        )
    }
}
export default PlaceCard