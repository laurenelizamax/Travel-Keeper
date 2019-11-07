import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class EditLodgingForm extends Component {
    //set the initial state
    state = {
        stayName: "",
        stayDescription: "",
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

    updateExistingStay = evt => {
        evt.preventDefault()
        this.toggle();
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
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <Button color="success" className="editAccommodation" onClick={this.toggle}>
                    Edit Accommodation</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Edit Accommodation
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="stayName">Accommodation: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="stayName"
                                    value={this.state.stayName}
                                />
                                <label htmlFor="stayDescription">Accommodation Description: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="stayDescription"
                                    value={this.state.stayDescription}
                                />
                                <ModalFooter>
                                    <Button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingStay}
                                        className="btn btn-primary"
                                    >Save Accommodation</Button>
                                    {" "}
                                    < Button className="cancel" onClick={this.toggle} >
                                        Cancel
                                     </Button >
                                </ModalFooter >
                            </fieldset>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default EditLodgingForm




