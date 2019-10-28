import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditLocationForm extends Component {
    //set the initial state
    state = {
        placeName: "",
        placeDescription: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingLocation = evt => {
        // console.log(this.props.placeId)
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedLocation = {
            id: this.props.placeId,
            placeName: this.state.placeName,
            placeDescription: this.state.placeDescription,
            tripId: this.props.tripId
        };

        APIManager.updateLocation(editedLocation)
            .then(() => this.props.getData())
    }
    componentDidMount() {
        APIManager.getOnePlace(this.props.placeId)
            .then(place => {
                // console.log(this.state.trip)
                this.setState({
                    placeName: place.placeName,
                    placeDescription: place.placeDescription,
                    loadingStatus: false
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <h4>Edit Location</h4>
                        <label htmlFor="placeName">Location: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="placeName"
                                value={this.state.placeName}
                            />
                            <label htmlFor="placeDescription">Location Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="placeDescription"
                                value={this.state.placeDescription}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingLocation}
                                className="btn btn-primary"
                            >Save Location</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditLocationForm