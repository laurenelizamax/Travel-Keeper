import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import AddLodging from "./AddLodging"
import AddActivities from "./AddActivities"
import AddTransportation from "./AddTransportation"
import EditLodgingForm from "./EditLodgingForm"
import EditActivityForm from "./EditActivityForm"
import EditTransportationForm from "./EditTransportationForm"
import "./Trip.css"

class LocationDetails extends Component {

    state = {
        place: "",
        accommodations: [],
        activities: [],
        transportations: [],
        accommodation: "",
        activity: "",
        transportation: ""
    }

    componentDidMount() {
        APIManager.getOnePlace(this.props.placeId)
            .then((place) => {
                this.setState({ place: place })
            })
            .then(() => {
                APIManager.getTripAccommodations(this.props.placeId)
                    .then((lodging) => {
                        this.setState({ accommodations: lodging })
                    })
            })

            .then(() => APIManager.getTripActivities(this.props.placeId)
                .then((activities) => {
                    this.setState({ activities: activities })
                })
            )
            .then(() => APIManager.getTripTransportation(this.props.placeId)
                .then((transportations) => {
                    this.setState({ transportations: transportations })
                })
            )
    }
    getData = () => {
        APIManager.getOnePlace(this.props.placeId)
            .then((place) => {
                this.setState({ place: place })
            })
            .then(() => {
                APIManager.getTripAccommodations(this.props.placeId)
                    .then((lodging) => {
                        this.setState({ accommodations: lodging })

                    })
            })
            .then(() => APIManager.getTripActivities(this.props.placeId)
                .then((activities) => {
                    this.setState({ activities: activities })
                })
            ).then(() => APIManager.getTripTransportation(this.props.placeId)
                .then((transportations) => {
                    this.setState({ transportations: transportations })
                })
            )
    }

    deleteStay = id => {
        APIManager.deleteStay(id)
            .then(() => {
                APIManager.getTripAccommodations(this.props.placeId)
                    .then((allStays) => {
                        this.setState({
                            accommodations: allStays,
                            accommodation: ""
                        })
                    })
            })
        this.getData();
    }

    deleteActivity = id => {
        APIManager.deleteActivity(id)
            .then(() => {
                APIManager.getTripActivities(this.props.placeId)
                    .then((allActivities) => {
                        this.setState({
                            activites: allActivities,
                            activity: ""
                        })
                    })
            })
        this.getData();
    }
    deleteTransportation = id => {
        APIManager.deleteTransportation(id)
            .then(() => {
                APIManager.getTripTransportation(this.props.placeId)
                    .then((allTrans) => {
                        this.setState({
                            transportations: allTrans,
                            transportation: ""
                        })
                    })
            })
        this.getData();
    }


    render() {
        return (
            <>
                <button type="button" className="profileButton"
                    onClick={() => { this.props.history.push("/") }}>Go to Profile</button>

                <button type="button" className="tripDetailsButton"
                    onClick={() => { this.props.history.push(`/trips/${this.state.place.tripId}`) }}>
                    Back to Trip Details</button>

                <AddLodging  {...this.props} getData={this.getData} />

                <AddActivities  {...this.props} getData={this.getData} />

                <AddTransportation {...this.props} getData={this.getData} />

                <div className="card">
                    <div className="card-content">
                        <h4>Location Details</h4>
                        <p><strong>Location:</strong> {this.state.place.placeName}</p>
                        <p><strong>Description:</strong> {this.state.place.placeDescription}</p>
                    </div>
                </div>

                        {this.state.accommodations.map(accommodation =>
                            <div  className="card" key={accommodation.id}>
                                <h5>Where You Stayed</h5>
                                <p><strong>Accommodation:</strong> {accommodation.stayName}</p>
                                <p><strong>Description:</strong> {accommodation.stayDescription}</p>
                                <EditLodgingForm accommodationId={accommodation.id} {...this.props} getData={this.getData} />
                                <button className="deleteButton" type="button" onClick={() => this.deleteStay(accommodation.id)}>Delete Stay</button>
                            </div>
                        )}
                 
                        {this.state.activities.map(activity =>
                            <div className="card" key={activity.id}>
                                <h5>What You Did</h5>
                                <p><strong>Activity:</strong> {activity.activityName}</p>
                                <p><strong>Description:</strong> {activity.activityDescription}</p>
                                <EditActivityForm activityId={activity.id} {...this.props} getData={this.getData} />
                                <button className="deleteButton" type="button" onClick={() => this.deleteActivity(activity.id)}>Delete Activity</button>

                            </div>
                        )}
            
                        {this.state.transportations.map(transportation =>
                            <div className="card" key={transportation.id}>
                                <h5>How You Got There</h5>
                                <p><strong>Transportation: </strong>{transportation.transportationName}</p>
                                <p><strong>Description:</strong> {transportation.transportationDescription}</p>
                                <EditTransportationForm transportationId={transportation.id} {...this.props} getData={this.getData} />
                                <button  className="deleteButton" type="button" onClick={() => this.deleteTransportation(transportation.id)}>Delete Transport</button>
                            </div>
                        )}
                  

            </>
        )
    }
}
export default LocationDetails