import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"


class EditTravelersForm extends Component {
    //set the initial state
    state = {
        travelerName: "",
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

    updateExistingTraveler = evt => {
        evt.preventDefault()
        this.toggle();
        this.setState({ loadingStatus: true });
        const editedTraveler = {
            travelerName: this.state.travelerName,
            id: this.props.fellowTravelerId,
            tripId: this.props.tripId
        };

        APIManager.updateTraveler(editedTraveler)
            .then(() => this.props.getData())
    }
    componentDidMount() {
        APIManager.getOneTraveler(this.props.fellowTravelerId)
            .then(fellowTravelers => {
                this.setState({
                    travelerName: fellowTravelers.travelerName,
                    loadingStatus: false
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
                <button  className="editButtonModal" onClick={this.toggle}>
                    Edit Traveler</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader  className="modalHeader" toggle={this.toggle} close={closeBtn}>
                        Edit Traveler
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="travelerName">Traveler: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="travelerName"
                                    value={this.state.travelerName}
                                />
                                <ModalFooter>
                                    <button
                                        type="submit" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingTraveler}
                                        className="submitButton"
                                              >Save Traveler</button>
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
export default EditTravelersForm
