import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditTransportationForm extends Component {
    //set the initial state
    state = {
        placeId: this.props.placeId,
        transportationName: "",
        transportationDescription: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTransportation = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTransportation = {
            id: this.props.id,
            transportationName: this.state.transportationName,
            transportationDescription: this.state.transportationDescription,
            placeId: this.state.placeId
        };

        APIManager.updateTransportation(editedTransportation)
        // .then(() => this.props.history.push("/"))
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                    <h4>Edit Transportation</h4>
                        <label htmlFor="transportationName">Transportation: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="transportationName"
                                value={this.state.transportationName}
                            />
                            <label htmlFor="transportationDescription">Transportation Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="transportationDescription"
                                value={this.state.transportationDescription}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTransportation}
                                className="btn btn-primary"
                            >Save Transportation</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditTransportationForm