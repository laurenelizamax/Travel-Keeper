import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


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
        // console.log(this.props)
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
                <Button color="success" className="editActivity" onClick={this.toggle}>
                    Edit Activity</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Edit Activity
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <label htmlFor="activityName">Activity: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="activityName"
                                    value={this.state.activityName}
                                />
                                <label htmlFor="activityDescription">Activity Description: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    onChange={this.handleFieldChange}
                                    id="activityDescription"
                                    value={this.state.activityDescription}
                                />
                                <ModalFooter>

                                    <Button
                                        type="button" disabled={this.state.loadingStatus}
                                        onClick={this.updateExistingActivity}
                                        className="btn btn-primary"
                                    >Save Activity</Button>
                                    {" "}
                                    <Button className="cancel" onClick={this.toggle}>
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

export default EditActivityForm


