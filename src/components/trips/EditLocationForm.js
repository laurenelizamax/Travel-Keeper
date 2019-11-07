import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"

class EditLocationForm extends Component {
    //set the initial state
    state = {
        placeName: "",
        placeDescription: "",
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

    updateExistingLocation = evt => {
        // console.log(this.props.placeId)
        evt.preventDefault()
        this.toggle();
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
        APIManager.getOnePlace(this.props.placeId)
            .then(() => this.props.getData())
    }


    render() {
        const closeBtn = (
            <button color="success" className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <button className="editButtonModal" onClick={this.toggle}>
                    Edit Location</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader className="modalHeader" toggle={this.toggle} close={closeBtn}>
                        Edit Location
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="placeName">Location: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="placeName"
                                    value={this.state.placeName}
                                />
                                <label htmlFor="placeDescription">Location Description: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="placeDescription"
                                    value={this.state.placeDescription}
                                />
                                <ModalFooter>
                                    <Button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingLocation}
                                        className="button"
                                    >Save Location</Button>
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

export default EditLocationForm

