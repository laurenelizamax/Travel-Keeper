import React, { Component } from "react"
import APIManager from "../../modules/APIManager"


class TripAddForm extends Component {
    state = {
        tripTitle: "",
        startDate: "",
        endDate: "",
        userId: "",
        notes: "",
        loadingStatus: false,
    };
    activeUser = parseInt(sessionStorage.getItem("userId"))

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewTrip = evt => {
        evt.preventDefault();
        if (this.state.tripTitle === "" || this.state.startDate === "" || this.state.endDate === "" || this.state.notes === "") {
            window.alert("Please add a trip title, start date and end date");
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                title: this.state.tripTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                notes: this.state.notes,
                userId: this.activeUser
            };

            APIManager.postTrip(trip)
            .then(() => this.props.history.push("/"));
        }

    };
    render() {
        return (
            <>
                <div>
                    <button type="button" className="cardButton"
                        onClick={() => { this.props.history.push("/") }}>Back to Profile</button>
                </div>

                <div className="tripAddForm">
                    <form>
                        <fieldset>
                            <div className="tripForm">
                                <label htmlFor="tripTitle">Trip Title:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="tripTitle"
                                    placeholder="TripTitle"
                                />
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="startDate"
                                    placeholder="Start Date"
                                />
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="endDate"
                                    placeholder="End Date"
                                />
                                 <label htmlFor="notes">Notes:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="notes"
                                    placeholder="notes"
                                />
                                  <button
                        type="submit"
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