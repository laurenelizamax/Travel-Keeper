import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


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
            // .then(() => {this.props.history.push("/")});
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
                <Button color="info" className="addTraveler" onClick={this.toggle} >
                    Add An Activity</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Add An Activity
                </ModalHeader>
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Activities input*/}
                                <label htmlFor="activityName">Activity:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityName"
                                    placeholder="Activities"
                                />
                                {/* Activities Description input*/}
                                <label htmlFor="activityDescription">Activity Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityDescription"
                                    placeholder="Activity Description"
                                />
                                <ModalFooter>
                                    {/* Button to create new activity*/}
                                    <Button
                                        type="submit"
                                        className="cardButton"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewActivity}
                                    >Add An Activity</Button>
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
        )
    }
}
export default AddActivities

