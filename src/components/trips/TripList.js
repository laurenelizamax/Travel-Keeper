import React, { Component } from "react"
import TripCard from "./TripCard"
import APIManager from "../../modules/APIManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class TripList extends Component {
    //define what this component needs to render
    state = {
        trips: [],
        modal: false,
        loadingStatus: false
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewTrip = evt => {
        evt.preventDefault();
        if (this.state.tripName === "" || this.state.startDate === "" || this.state.endDate === ""
        || this.state.userId === "") {
            window.alert("Please input a title, date and venue");
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                name: this.state.tripName,
                startDate: this.trip.startDate,
                endDate: this.trip.endDate,
                userId: this.state.userId,
            };

            APIManager.postTrip(trip)
                .then(() => this.getData());
        }

    };
    getData = () => {
        APIManager.getAllTrips()
            .then((trips) => {
                this.setState({
                    trips: trips
                })
            })
    }
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentDidMount() {
        this.getData()
    }

    // componentDidMount() {
    //     APIManager.getAllTrips()
    //         .then((trips) => {
    //             this.setState({
    //                 trips: trips
    //             })
    //         })
    // }

    render() {
        return (
            <>
             <div className="tripAddFormContainer">
                    <div id="tripAddFormHeader"><h3>Add A Trip</h3>
                    </div>
                    <Button id="modalFormBtn" onClick={this.toggle} >{this.props.buttonLabel} Add Another Trip </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.tripName}>
                        <ModalHeader toggle={this.toggle}>Add New Trip</ModalHeader>
                        <ModalBody>
                            <form>
                                <fieldset>
                                    <div className="tripAddForm">
                                        <label htmlFor="tripTitle">Title:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="tripTitle"
                                            placeholder="Trip Title"
                                        />
                                        <label htmlFor="startDate">Start Date:</label>
                                        <input
                                            type="date"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="startDate"
                                            placeholder="Start Date"
                                        />
                                        <label htmlFor="endDate">End Date:</label>
                                        <input
                                            type="date"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="endDate"
                                            placeholder="End Date"
                                        />
                                        <label htmlFor="note">Notes:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="notes"
                                            placeholder="Notes"
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button id="editBtn"
                                onClick={(evt) => {
                                    this.constructNewTrip(evt)
                                    this.toggle()
                                }}>Add New Trip</Button>{' '}
                            <Button id="deleteBtn" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <h1>Trip List</h1>
                <div className="container-cards">
                    {this.state.trips.map(trip =>
                        <TripCard key={trip.id} trip={trip} 
                        />
                    )}
                </div>
                </>
        )
    }
}
export default TripList