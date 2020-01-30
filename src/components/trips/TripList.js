import React, { Component } from "react"
import TripCard from "./TripCard"
import APIManager from "../../modules/APIManager"
import TripAddForm from "./TripAddForm"
import "./TripList.css"


class TripList extends Component {
    state = {
        trips: [],
        activeUser: this.props.activeUser,
        loadingStatus: false
    }


    deleteTrip = id => {
        APIManager.delete(id)
        .then(() => APIManager.getTripPlaces(this.props.tripId)

        .then((locations) => {
            locations.forEach(location => {
                APIManager.deleteLocation(location.id)
            })
                
                    })
        )
                    APIManager.getAllTrips(this.props.activeUser)
                    .then((newTrips) => {
                        this.setState({
                            trips: newTrips
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