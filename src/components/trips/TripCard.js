import React, { Component } from "react"
// import APIManager from "../../modules/APIManager"
import { Link, withRouter } from "react-router-dom"
import { Button } from "reactstrap"


class TripCard extends Component {


    render() {
        return (
            <>
                <div className="card">
                    <div className="card-content">

                        <h4>Title: <span>{this.props.trip.title}</span></h4>
                        <p>Start Date: {this.props.trip.startDate}</p>
                        <p>End Date: {this.props.trip.endDate}</p>
                        <p>Notes: {this.props.trip.notes}</p>

                        <Link to={`/trips/${this.props.trip.id}`}><Button>Details</Button></Link>

                        <Button color="danger" type="button" onClick={() => this.props.deleteTrip(this.props.trip.id)}>Delete Trip</Button>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(TripCard)