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
        // const setNewState = {}
        APIManager.getOnePlace(this.props.placeId)
            .then((places) => {
                // console.log(places)
                this.setState({place: places})

                //setNewStatethis.place = places
            })
            .then(() => { APIManager.getTripAccommodations(this.props.placeId)
                .then((lodging) => {
                    // console.log(lodging)
                    this.setState({accommodations: lodging})
                })
            })

            .then(() => APIManager.getTripActivities(this.props.placeId)
                .then((activities) => {
                    // setNewState.activities = activities
                    this.setState({activities: activities})
                })
            )
            .then(() => APIManager.getTripTransportation(this.props.placeId)
                .then((transportations) => {
                    // setNewState.transportations = transportations
                    this.setState({transportations: transportations})
                })
            )
            .then(() => {
                //this.setState(setNewState)
            })
    }
    getData = () => {
        // const setNewState = {}
        APIManager.getOnePlace(this.props.placeId)
            .then((places) => {
                // setNewState.place = places
                this.setState({place: places})
            })
         .then(() => { APIManager.getTripAccommodations(this.props.placeId)
            .then((lodging) => {
                //newState.accommodations = 
                this.setState({accommodations: lodging})

            })
        })
            .then(() => APIManager.getTripActivities(this.props.placeId)
                .then((activities) => {
                    this.setState({activities: activities})
                })
            ).then(() => APIManager.getTripTransportation(this.props.placeId)
                .then((transportations) => {
                    this.setState({transportations: transportations})
                })
            )
            .then(() => {
                // console.log(this.state)
                // this.setState(setNewState)
            })
    }

    render() {
        // console.log(this.state)
        return (
            <>
              <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

                <div>
                    <p>Location: {this.state.place.placeName}</p>
                    <p>Description: {this.state.place.placeDescription}</p>
                </div>

                {this.state.accommodations.map(accommodation =>
                    <div>
                        <p>Accommodations: {accommodation.stayName}</p>
                        <p>Description: {accommodation.stayDescription}</p>
                        <EditLodgingForm {...this.props} getData={this.getData} />
                    </div>
                )} 

                 {this.state.activities.map(activity =>
                    <div>
                        <p>Activites: {activity.activityName}</p>
                        <p>Description: {activity.activityDescription}</p>
                        <EditActivityForm {...this.props} getData={this.getData} />
                    </div>
                )}

                {this.state.transportations.map(transportation =>
                    <div>
                        <p>Transportation: {transportation.transportationName}</p>
                        <p>Description: {transportation.transportationDescription}</p>
                        <EditTransportationForm {...this.props} getData={this.getData} />
                    </div>
                )}

                <AddLodging  {...this.props} getData={this.getData} />

                <AddActivities  {...this.props} getData={this.getData} />

                <AddTransportation {...this.props} getData={this.getData} />

            </>
        )
    }
}
export default LocationDetails