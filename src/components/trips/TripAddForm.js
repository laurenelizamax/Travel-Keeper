import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class TripAddForm extends Component {
    state = {
        tripTitle: "",
        startDate: "",
        endDate: "",
        notes: "",
        fellowTravelers: [],
        userId: this.props.activeUser,
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewTrip = evt => {
        evt.preventDefault();
        if (this.state.tripTitle === "" || this.state.startDate === "" || this.state.endDate === "" ||
            this.state.notes === "") {
            window.alert("Please add trip details");
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                title: this.state.tripTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                notes: this.state.notes,
                userId: this.props.activeUser
            }

            APIManager.postTrip(trip)
                .then(() => {this.props.history.push("/")});
                // `/trips/${this.props.tripId}`
                // {<Link to={`/trips/${this.props.trip.id}`}></Link>}
        }
    }

    render() {
        return (
            <>
                <div>
                    <button type="button" className="cardButton"
                        onClick={() => { this.props.history.push("/") }}>Back to Profile</button>
                </div>

                <div>
                    <form className="tripAddForm">
                        <fieldset>
                        <h4>Add Trip</h4>
                            <div className="tripForm">
                                {/* Trip Title input*/}
                                <label htmlFor="tripTitle">Trip Title:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="tripTitle"
                                    placeholder="TripTitle"
                                />
                                {/* Start Date input*/}
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="startDate"
                                    placeholder="Start Date"
                                />
                                {/* End Date input*/}
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="endDate"
                                    placeholder="End Date"
                                />
                                {/* Notes input*/}
                                <label htmlFor="notes">Notes:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="notes"
                                    placeholder="notes"
                                />
                                {/* Button to create new trip*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewTrip}
                                >Submit</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default TripAddForm