import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
        // console.log(this.props)
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
        // console.log(editedTraveler)
    }
    componentDidMount() {
        // console.log(this.props)
        APIManager.getOneTraveler(this.props.fellowTravelerId)
            .then(fellowTravelers => {
                // console.log(fellowTravelers)
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
                <Button color="success" className="button" onClick={this.toggle}>
                    Edit Traveler</Button>
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
                                    <Button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingTraveler}
                                        className="button"
                                              >Save Traveler</Button>
                                    {" "}
                                    <Button className="button" onClick={this.toggle}>
                                        Cancel
                                     </Button>
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
