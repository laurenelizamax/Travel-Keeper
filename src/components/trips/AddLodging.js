import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Trip.css"


class AddLodging extends Component {
    state = {
        placeId: this.props.placeId,
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
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripAccommodations(2)
            .then((allStays) => {
                // console.log(allStays)
                this.setState({
                    accommodations: allStays
                })
            })
    }
    constructNewStay = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.stayName === "" || this.state.stayDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const stay = {
                stayName: this.state.stayName,
                stayDescription: this.state.stayDescription,
                placeId: this.state.placeId
            }

            APIManager.postStay(stay)
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
                <button className="addButtonModal" onClick={this.toggle} >
                    Add Accommodation</button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    < ModalHeader  className="modalHeader" toggle={this.toggle} close={closeBtn} >
                        Add Accommodation
					</ModalHeader >
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Accommodations  input*/}
                                <label htmlFor="stayName">Accommodation:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="stayName"
                                    placeholder="Accommodation"
                                />
                                {/* Accommodations Description input*/}
                                <label htmlFor="stayDescription">Accommodation Description:</label>
                                <textarea
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="stayDescription"
                                    placeholder="Accommodation Description"
                                />
                                <ModalFooter>
                                    {/* Button to create new location*/}
                                    <button
                                        type="submit"
                                        className="submitButton"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewStay}
                                    >Save Stay</button>
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
export default AddLodging

