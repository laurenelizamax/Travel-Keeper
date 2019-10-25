import React, {  Component } from "react"
// import APIManager from "../../modules/APIManager"
import {Link, withRouter} from "react-router-dom"


class TripCard extends Component {


    render() {
        return (
            <>
            <h4>Title: <span>{this.props.trip.title}</span></h4>
            <p>Start Date: {this.props.trip.startDate}</p>
            <p>End Date: {this.props.trip.endDate}</p>
            {/* <button onClick={() => this.props.history.push("/TripDetails")}
            className="cardButton">Details</button> */}
          <Link to={`/trips/${this.props.trip.id}`}><button>Details</button></Link>
          <button type="button" onClick={() => this.props.deleteTrip(this.props.trip.id)}>Delete Trip</button>
            </>
        )
    }
}
export default withRouter(TripCard)