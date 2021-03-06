import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripList.css"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class AddTravelers extends Component {
    state = {
        tripId: this.props.tripId,
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
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripTravelers()
            .then((allTravelers) => {
                this.setState({
                    travelers: allTravelers
                }
                )
            })
    }
    constructNewTraveler = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.travelerName === "") {
            window.alert("Please add  a name");
        } else {
            this.setState({ loadingStatus: true });
            const traveler = {
                travelerName: this.state.travelerName,
                tripId: this.state.tripId
            }

            APIManager.postTraveler(traveler)
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
                    Add A Traveler</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                <ModalHeader className="modalHeader" toggle={this.toggle} close={closeBtn}>
                Add A Traveler
					</ModalHeader>
                <ModalBody>
                    <form className="tripAddForm">
                        <fieldset>
                            <div className="tripForm">
                                {/* Fellow Travelers  input*/}
                                <label htmlFor="travelerName">Fellow Traveler:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="travelerName"
                                    placeholder="Fellow Traveler"
                                />
                            </div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter>
                    {/* Button to create new traveler*/}
                    <button
                        type="submit"
                        className="submitButton"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewTraveler}
                    >Add A Traveler
                     </button>{" "}
                    <button className="cancelButton" onClick={this.toggle}>
                        Cancel
                    </button>
                </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default AddTravelers

