import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditTravelersForm extends Component {
    //set the initial state
    state = {
        travelerName: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTraveler = evt => {
        console.log(this.props)
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTraveler = {
            travelerName: this.state.travelerName,
            id: this.props.fellowTravelerId,
            tripId: this.props.tripId
        };

        APIManager.updateTraveler(editedTraveler)
            .then(() => this.props.getData())
            console.log(editedTraveler)
    }
    componentDidMount() {
        console.log(this.props)
        APIManager.getOneTraveler(this.props.fellowTravelerId)
            .then(fellowTravelers => {
                console.log(fellowTravelers)
                this.setState({
                    travelerName: fellowTravelers.travelerName,
                    loadingStatus: false
                });
            });
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
                            >Save Traveler</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}
export default EditTravelersForm