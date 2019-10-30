import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


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
        // console.log(this.props)
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
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <Button color="success" className="editTrip" onClick={this.toggle}>
                    Edit Trip</Button>
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
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="notes"
                                    value={this.state.notes}
                                />
                                <ModalFooter>
                                    <Button type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingTrip}
                                        className="saveTrip"
                                    >Save Trip</Button>
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


