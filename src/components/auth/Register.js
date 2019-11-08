import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
import { withRouter } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class Register extends Component {
    state = {
        regName: "",
        regEmail: "",
        regPassword: "",
        userPlace: "",
        dreamTrip: "",
        loadingStatus: false,
        modal: false,
    };
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleRegistration = e => {
        e.preventDefault();
        this.toggle();
        let name = this.state.regName;
        let password = this.state.regPassword;
        let email = this.state.regEmail;
        let userPlace = this.state.userPlace;
        let dreamTrip = this.state.dreamTrip;
        if (name === "") {
            alert('Please enter a valid Email.');
        }
        else {
            const newUser = {
                password: password,
                name: name,
                dreamTrip: dreamTrip,
                userPlace: userPlace,
                email: email
            };
            LogRegManager.createNewUser(newUser).then(response => {
                if (response.length === 0) {
                    alert('Please enter a valid Email');
                } else {
                    this.props.setUser(response.id);
                    this.props.history.push("/");
                }
            });
        }
    };

    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
            </button>);
        return (
            <>
                {" "}
                <Button className="regModalBtn" onClick={this.toggle} >
                    Register</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Register
					</ModalHeader>
                    <ModalBody>
                        <div>
                            <form onSubmit={this.handleRegistration}>
                                <label htmlFor="regName">Name:</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="regName"
                                    placeholder="Enter Name"
                                    required="" autoFocus="" />
                                <br></br>
                                <label htmlFor="userPlace">Location:</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="userPlace"
                                    placeholder="Location"
                                    required="" autoFocus="" />
                                <br></br>
                                <label htmlFor="dreamTrip">Dream Destination:</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="dreamTrip"
                                    placeholder="Dream Destination"
                                    required="" autoFocus="" />
                                <br></br>
                                <label htmlFor="regEmail">Email:</label>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="regEmail"
                                    placeholder=" Enter Email"
                                    required="" autoFocus="" />
                                <br></br>
                                <label htmlFor="regPassword">Password:</label>
                                <input onChange={this.handleFieldChange} type="password"
                                    id="regPassword"
                                    placeholder=" regPassword"
                                    required="" autoFocus="" />
                                <br></br>
                                <ModalFooter>
                                    <Button type="submit" className="submit">Register</Button>
                                    {" "}
                                    <Button className="cancel" onClick={this.toggle}>
                                        Cancel
                                     </Button>
                                </ModalFooter>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </>

        )
    }
}
export default withRouter(Register);