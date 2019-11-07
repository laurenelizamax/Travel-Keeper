import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"


class EditTransportationForm extends Component {
    //set the initial state
    state = {
        transportationName: "",
        transportationDescription: "",
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

    updateExistingTransportation = evt => {
        evt.preventDefault()
        this.toggle();
        this.setState({ loadingStatus: true });
        const editedTransportation = {
            id: this.props.transportationId,
            transportationName: this.state.transportationName,
            transportationDescription: this.state.transportationDescription,
            placeId: this.props.placeId
        };

        APIManager.updateTransportation(editedTransportation)
            .then(() => this.props.getData())
    }

    componentDidMount() {
        // console.log(this.props)
        APIManager.getOneTransportation(this.props.transportationId)
            .then(transportations => {
                this.setState({
                    transportationName: transportations.transportationName,
                    transportationDescription: transportations.transportationDescription,
                    placeId: this.props.placeId,
                    loadingStatus: false
                });
            });
    }

    render() {
        const closeBtn = (
            <button color="success" className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <button  className="editButtonModal" onClick={this.toggle}>
                    Edit Transport</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader className="modalHeaer" toggle={this.toggle} close={closeBtn}>
                        Edit Transportation
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="transportationName">Transportation: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="transportationName"
                                    value={this.state.transportationName}
                                />
                                {/*input for transportation description*/}
                                <label htmlFor="transportationDescription">Transportation Description: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="transportationDescription"
                                    value={this.state.transportationDescription}
                                />
                                <ModalFooter>
                                    {/*Button that saves updated transportation */}
                                    <button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingTransportation}
                                        className="submitButton"
                                    >Save Transport</button>
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

export default EditTransportationForm
