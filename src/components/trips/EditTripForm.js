import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./TripList.css"



class EditTripForm extends Component {
    state = {
        tripTitle: "",
        startDate: "",
        endDate: "",
        notes: "",
        userId: this.props.activeUser,
        loadingStatus: false,
        modal: false,
    };
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTrip = evt => {
        evt.preventDefault()
        this.toggle();
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
            .then(() => this.props.getData())
    }

    componentDidMount() {
        APIManager.getTrip(this.props.tripId)
            .then(trip => {
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
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <button className="editButtonModal"  onClick={this.toggle}>
                    Edit Trip</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Edit Trip
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="tripTitle">Title: </label>
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
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="notes"
                                    value={this.state.notes}
                                />
                                <ModalFooter>
                                    <button type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingTrip}
                                        className="submitButton"
                                    >Save Trip</button>
                                    {" "}
                                    <button className="cancelButton" onClick={this.toggle}>
                                        Cancel
                                     </button>
                                </ModalFooter>
                            </fieldset>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default EditTripForm


