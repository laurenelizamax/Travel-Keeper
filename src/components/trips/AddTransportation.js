import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class AddTransportation extends Component {
    state = {
        placeId: this.props.placeId,
        transportationName: "",
        transportationDescription: "",
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
        APIManager.getTripTransportation()
            .then((allTransportations) => {
                this.setState({
                    transportations: allTransportations
                })
            })
    }
    constructNewTransportation = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.transportationName === "" || this.state.transportationDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const stay = {
                transportationName: this.state.transportationName,
                transportationDescription: this.state.transportationDescription,
                placeId: this.state.placeId
            }

            APIManager.postTransportation(stay)
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
                    Add Transportation</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Add Transportation
					</ModalHeader>
                    <ModalBody>
                        <form className="tripAddForm">
                            <fieldset>
                                {/* Transportation  input*/}
                                <label htmlFor="transportationName">Transportation:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="transportationName"
                                    placeholder="Transportation"
                                />
                                {/* Transportation Description input*/}
                                <label htmlFor="transportationDescription">Transportation Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="transportationDescription"
                                    placeholder="Transportation Description"
                                />
                                <ModalFooter>
                                    {/* Button to create new location*/}
                                    <Button
                                        type="submit"
                                        className="cardButton"
                                        disabled={this.state.loadingStatus}
                                        onClick={this.constructNewTransportation}
                                    >Add Transportation</Button>
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
export default AddTransportation



