import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./TripList.css"


class EditActivityForm extends Component {
    //set the initial state
    state = {
        activityName: "",
        activityDescription: "",
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

    updateExistingActivity = evt => {
        evt.preventDefault()
        this.toggle();
        this.setState({ loadingStatus: true });
        const editedActivity = {
            id: this.props.activityId,
            activityName: this.state.activityName,
            activityDescription: this.state.activityDescription,
            placeId: this.props.placeId
        };

        APIManager.updateActivity(editedActivity)
            .then(() => this.props.getData())

    }
    componentDidMount() {
        APIManager.getOneActivity(this.props.activityId)
            .then(activities => {
                this.setState({
                    activityName: activities.activityName,
                    activityDescription: activities.activityDescription,
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
                    Edit Activity</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader className="modalHeader" toggle={this.toggle} close={closeBtn}>
                        Edit Activity
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="activityName">Activity: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="activityName"
                                    value={this.state.activityName}
                                />
                                <label htmlFor="activityDescription">Activity Description: </label>
                                <textarea
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="activityDescription"
                                    value={this.state.activityDescription}
                                />
                                <ModalFooter>

                                    <button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingActivity}
                                        className="submitButton"
                                    >Save Activity</button>
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

export default EditActivityForm


