import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripList.css"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class AddLocation extends Component {
    state = {
        tripId: this.props.tripId,
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
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripPlaces()
            .then((allPlaces) => {
                this.setState({
                    places: allPlaces
                }
                )
            })
    }
    constructNewLocation = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.placeName === "" || this.state.placeDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const place = {
                placeName: this.state.placeName,
                placeDescription: this.state.placeDescription,
                tripId: this.state.tripId
            }

            APIManager.postLocation(place)
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
                    Add Location</button>
                < Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                        <ModalHeader className="modalHeader" toggle={this.toggle} close={closeBtn}>
                            Add Location
					</ModalHeader>
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Location  input*/}
                                <label htmlFor="placeName">Location:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="placeName"
                                    placeholder="Location"
                                />
                                <br></br>
                                {/* Location Description input*/}
                                <label htmlFor="placeDescription">Location Description:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="placeDescription"
                                    placeholder="Location Description"
                                />
                                <ModalFooter>

                                    {/* Button to create new location*/}
                                    <button
                                        type="submit"
                                        className="submitButton"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewLocation}
                                    >Add Location</button>
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
export default AddLocation

