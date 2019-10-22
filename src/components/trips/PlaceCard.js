import React, { Component } from "react"
import APIManager from "../../modules/APIManager"


class PlaceCard extends Component {
    state = {
        places: [],
        fellowTravelers: [],
        accomodations: [],
        transportations: [],
        transportationLocations: [],
        activites: []
    }

    render() {
        return (
            <>
               <h4>Title: <span>{this.props.trip.title}</span></h4>
                <p>Start Date: {this.props.trip.startDate}</p>
                <p>End Date: {this.props.trip.endDate}</p>
                <p>Location: {this.props.place.name}</p>
                <p>Description: {this.props.place.description}</p>
                <p>Fellow Travelers: {this.props.fellowTravelers.name}</p>
                <p>Accomodations: {this.props.accomodations.name}</p>
                <p>Description of the Accomodations: {this.props.accomodations.description}</p>
                <p>Transportation: {this.props.transportations.id}</p>
                <p>Description of Transportation: {this.props.transportationLocations.description}</p>
                <p>Activites: {this.props.activites.name}</p>
                <p>Description of Activites: {this.props.activites.name}</p>

            </>
        )
    }
}
export default PlaceCard