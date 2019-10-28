import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditTravelersForm extends Component {
    //set the initial state
    state = {
        tripId: this.props.tripId,
        travelerName: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTraveler = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTraveler = {
            id: this.props.id,
            travelerName: this.state.travelerName,
            tripId: this.state.tripId
        };

        APIManager.updateTraveler(editedTraveler)
        // .then(() => this.props.history.push("/"))
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <h4>Edit Fellow Travelers</h4>
                        <label htmlFor="travelerName">Traveler: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="travelerName"
                                value={this.state.travelerName}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTraveler}
                                className="btn btn-primary"
                            >Save Fellow Traveler</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditTravelersForm