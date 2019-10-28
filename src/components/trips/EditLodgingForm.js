import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditLodgingForm extends Component {
    //set the initial state
    state = {
        stayName: "",
        stayDescription: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingStay = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedLodging = {
            id: this.props.accommodationId,
            stayName: this.state.stayName,
            stayDescription: this.state.stayDescription,
            placeId: this.props.placeId
        };

        APIManager.updateStay(editedLodging)
        .then(() => this.props.getData())
    }

    componentDidMount() {
        // console.log(this.props)
        APIManager.getOneAccommodation(this.props.accommodationId)
            .then(accommodations => {
                this.setState({
                    stayName: accommodations.stayName,
                    stayDescription: accommodations.stayDescription,
                    placeId: this.props.placeId,
                    loadingStatus: false
                });
            });
        }
    render() {
        return (
            <>
                <form>
                    <fieldset>
                    <h4>Edit Accommodations</h4>
                        <label htmlFor="stayName">Accommodation: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="stayName"
                                value={this.state.stayName}
                            />
                            <label htmlFor="stayDescription">Accommodation Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="stayDescription"
                                value={this.state.stayDescription}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingStay}
                                className="btn btn-primary"
                            >Save Accommodation</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditLodgingForm