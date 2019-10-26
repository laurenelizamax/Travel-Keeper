import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import AddLodging from "./AddLodging"

class LocationDetails extends Component {

    state = {
        place: "",
        accommodations: []
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
            )
            .then(() => {
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
                        <p>Accommodations: {accommodation.name}</p>
                        <p>Description: {accommodation.description}</p>
                    </div>
                )}
                <AddLodging  {...this.props} getData={this.getData} />


                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push(`/trips/${this.props.place.id}/edit`) }}>Edit Trip</button>


                <button type="button" className="cardButton"
                    onClick={() => { this.props.history.push("/") }}>Back to Profile</button>

            </>
        )
    }
}
export default LocationDetails