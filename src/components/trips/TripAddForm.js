import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
// import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"



class TripAddForm extends Component {
    state = {
        tripTitle: "",
        startDate: "",
        endDate: "",
        notes: "",
        fellowTravelers: [],
        userId: this.props.activeUser,
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
    constructNewTrip = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.tripTitle === "" || this.state.startDate === "" || this.state.endDate === "" ||
            this.state.notes === "") {
            window.alert("Please add trip details");
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                title: this.state.tripTitle,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                notes: this.state.notes,
                userId: this.props.activeUser
            }
            APIManager.postTrip(trip)
                .then(() => {
                    this.props.getData()
                    this.setState({ loadingStatus: false });
                })
        }
    }
    componentDidMount() {
        APIManager.getAllTrips()
            .then((allTrips) => {
                this.setState({
                    trips: allTrips
                })
            })
    }

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <div className="container">
                <button className="tripAddButton" onClick={this.toggle} >
                    Add A Trip</button>
                    </div>
                < Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Add A Trip
					</ModalHeader>
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Trip Title input*/}
                                <label htmlFor="tripTitle">Trip Title:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="tripTitle"
                                    placeholder="TripTitle"
                                />
                                <br></br>
                                {/* Start Date input*/}
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="startDate"
                                    placeholder="Start Date"
                                />
                                <br></br>
                                {/* End Date input*/}
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="endDate"
                                    placeholder="End Date"
                                />
                                <br></br>
                                {/* Notes input*/}
                                <label htmlFor="notes">Notes:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="notes"
                                    placeholder="notes"
                                />
                                <ModalFooter>
                                    {/* Button to create new trip*/}
                                    <button className="submitButton"
                                        type="submit"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewTrip}
                                    >Add A Trip</button>
                                    {" "}
                                    <button className="cancelButton" onClick={this.toggle}>
                                        Cancel
                                    </button>
                                </ModalFooter>
                            </fieldset>
                        </form>
                    </ModalBody>
                </ Modal>
            </>
        )
    }
}
export default TripAddForm
