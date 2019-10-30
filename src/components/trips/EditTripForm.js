import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditTripForm extends Component {
    state = {
        tripTitle: "",
        startDate: "",
        endDate: "",
        notes: "",
        userId: this.props.activeUser,
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTrip = evt => {
        // console.log(this.props)
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTrip = {
            id: this.props.tripId,
            title: this.state.tripTitle,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            notes: this.state.notes,
            userId: this.props.activeUser
        };

        APIManager.updateTrip(editedTrip)
        // console.log(editedTrip)
        .then(() => this.props.getData())
    }

    componentDidMount() {
        APIManager.getTrip(this.props.tripId)
        .then(trip => {
            // console.log(this.state.trip)
            this.setState({
              tripTitle: trip.title,
              startDate: trip.startDate,
              endDate: trip.endDate,
              notes: trip.notes,
              userId: this.props.activeUser,
              loadingStatus: false,
            });
        });
      }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                    <h4>Edit Trip</h4>
                        <label htmlFor="tripTitle">Title: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="tripTitle"
                                value={this.state.tripTitle}
                            />
                            <label htmlFor="startDate">Start Date: </label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="startDate"
                                value={this.state.startDate}
                            />
                              <label htmlFor="endDate">End Date: </label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="endDate"
                                value={this.state.endDate}
                            />
                            <label htmlFor="notes">Notes: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="notes"
                                value={this.state.notes}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTrip}
                                className="btn btn-primary"
                            >Save Trip</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditTripForm