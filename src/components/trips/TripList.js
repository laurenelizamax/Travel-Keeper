import React, { Component } from "react"
import TripCard from "./TripCard"
import APIManager from "../../modules/APIManager"
import TripAddForm from "./TripAddForm"


class TripList extends Component {
    //define what this component needs to render
    state = {
        trips: [],
        activeUser: this.props.activeUser,
        loadingStatus: false
    }

    deleteTrip = id => {
        APIManager.delete(id)
            .then(() => {
                APIManager.getAllTrips(this.props.activeUser)
                    .then((newTrips) => {
                        this.setState({
                            trips: newTrips
                        })
                    })
            })
    }

    getData = () => {
        APIManager.getAllTrips(this.props.activeUser)
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
                <TripAddForm 
                getData={this.getData}
                activeUser={this.props.activeUser} 
                {...this.props} />
                    {/* <button type="button"
                        className="formButton"
                        onClick={() => { this.props.history.push("/trip/new") }}>Add A Trip</button> */}
                </div>
                <div className="container-cards">
                    {this.state.trips.map(trip =>

                        <TripCard key={trip.id}
                            trip={trip}
                            deleteTrip={this.deleteTrip}
                        tripId={trip.id}
                        {...this.props}

                        />
                    )}
                </div>
            </>
        )
    }
}
export default TripList