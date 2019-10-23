import React, { Component } from "react"
import APIManager from "../../modules/APIManager"


class PlaceCard extends Component {
    state = {
        accomodations: [],
        transportations: [],
        activities: []
    }

    componentDidMount() {
        console.log("placecard mounted")
        const newState = {}
            APIManager.getTripAccomodations(this.props.place.id)
                .then((lodging) => {
                    newState.accomodations = lodging
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
        console.log("placecard rendering")
        return (
            <>
            <div>
                        <p>Location: {this.props.place.name}</p>
                        <p>Description: {this.props.place.description}</p>
                    </div>

                {this.state.accomodations.map(accomodation =>
                    <div>
                        <p>Accomodations: {accomodation.name}</p>
                        <p>Description: {accomodation.description}</p>
                    </div>
                )}

                {this.state.transportations.map(transportation =>
                    <div>
                        <p>Transportation: {transportation.name}</p>
                        <p>Description: {transportation.description}</p>

                    </div>
                )}

               {this.state.activities.map(activity =>
                    <div>
                        <p>Activites: {activity.name}</p>
                        <p>Description: {activity.description}</p>
                    </div>
                     )}

            </>
        )
    }
}
export default PlaceCard