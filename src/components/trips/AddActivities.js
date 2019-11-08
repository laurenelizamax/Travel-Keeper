import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"


class AddActivities extends Component {
    state = {
        placeId: this.props.placeId,
        activityName: "",
        activityDescription: "",
        loadingStatus: false,
        modal: false
    };
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripActivities()
            .then((allActivities) => {
                this.setState({
                    activities: allActivities
                })
            })
    }
    constructNewActivity = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.activityName === "" || this.state.activityDescription === "") {
            window.alert("Please add an activity");
        } else {
            this.setState({ loadingStatus: true });
            const activity = {
                activityName: this.state.activityName,
                activityDescription: this.state.activityDescription,
                placeId: this.state.placeId
            }

            APIManager.postActivity(activity)
                .then(() => {
                    this.props.getData()
                    this.setState({ loadingStatus: false });
                })
        }
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <button className="addButtonModal" onClick={this.toggle} >
                    Add An Activity</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader className="modalHeader" toggle={this.toggle} close={closeBtn}>
                        Add An Activity
                </ModalHeader>
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Activities input*/}
                                <label htmlFor="activityName">Activity:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityName"
                                    placeholder="Activities"
                                />
                                <br></br>
                                {/* Activities Description input*/}
                                <label htmlFor="activityDescription">Activity Description:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityDescription"
                                    placeholder="Activity Description"
                                />
                                <ModalFooter>
                                    {/* Button to create new activity*/}
                                    <button
                                        type="submit"
                                        className="submitButton"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewActivity}
                                    >Add An Activity</button>
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
        )
    }
}
export default AddActivities

