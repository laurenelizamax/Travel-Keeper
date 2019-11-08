import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "./TripCard.css"


class TripCard extends Component {


    render() {
        return (
            <>
                <div className="card">
                    <div className="card-content">
                        <div className="tripCard">
                        <h4>Title: <span>{this.props.trip.title}</span></h4>
                        <p>Start Date: {this.props.trip.startDate}</p>
                        <p>End Date: {this.props.trip.endDate}</p>
                        <p>Notes: {this.props.trip.notes}</p>

                        <Link to={`/trips/${this.props.trip.id}`}><button className="detailsButton">Details</button></Link>

                        <button className="deleteButton"  type="button" onClick={() => this.props.deleteTrip(this.props.trip.id)}>Delete Trip</button>
                    </div>
                </div>
                </div>
            </>
        )
    }
}
export default withRouter(TripCard)