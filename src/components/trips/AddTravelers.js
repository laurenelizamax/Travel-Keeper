import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



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
            // .then(() => {this.props.history.push("/")});
            // .then(() => {
            //     this.setState({
            //     })
            //     console.log("userId2", this.state.userId);
            // })
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
                    Add A Traveler</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                <ModalHeader toggle={this.toggle} close={closeBtn}>
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
                    <Button
                        type="submit"
                        className="cardButton"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewTraveler}
                    >Add A Traveler
                     </Button>{" "}
                    <Button className="cancel" onClick={this.toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default AddTravelers

