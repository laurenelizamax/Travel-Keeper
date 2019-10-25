import React, { Component } from "react"
import TripCard from "./TripCard"
import APIManager from "../../modules/APIManager"


class TripList extends Component {
    //define what this component needs to render
    state = {
        trips: [],
        loadingStatus: false
    }
    deleteTrip = id => {
        APIManager.delete(id)
            .then(() => {
                APIManager.getAllTrips()
                    .then((newTrips) => {
                        this.setState({
                            trips: newTrips
                        })
                    })
            })
    }

    getData = () => {
        APIManager.getAllTrips()
            .then((trips) => {
                this.setState({
                    trips: trips
                })
            })
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <>
                <h1>Trip List</h1>
                <div>
                    <button type="button"
                        className="formButton"
                        onClick={() => { this.props.history.push("/trip/new") }}>Add A Trip</button>
                </div>
                <div className="container-cards">
                    {this.state.trips.map(trip =>
                        <TripCard key={trip.id}
                            trip={trip}
                            deleteTrip={this.deleteTrip}
                        />
                    )}
                </div>
            </>
        )
    }
}
export default TripList