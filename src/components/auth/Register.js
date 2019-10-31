import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
import { withRouter} from "react-router-dom"


class Register extends Component {
    state = {
        regName: "",
        regEmail: "",
        regPassword: "",
        userPlace: "",
        dreamTrip: ""
    }
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleRegistration = e => {
		e.preventDefault();
		let name = this.state.regName;
        let password = this.state.regPassword;
        let email = this.state.regEmail;
		let userPlace = this.state.userPlace;
        let dreamTrip = this.state.dreamTrip;
		// starting the if statement
		if (name === ' ') {
			alert('Please fill in name');
		} else {
			const newUser = {
				password: password,
                name: name,
                dreamTrip: dreamTrip,
                userPlace: userPlace,
                email: email
			};
			LogRegManager.createNewUser(newUser).then(response => {
				this.props.setUser(response.id);
				this.props.history.push("/");
			});
		}
	};

    render() {
        // console.log(this.state.regName)
        return (
            <>
                <div className="logRegForm">
                    <h3 className="logRegTitle">Register!</h3>
                    <form onSubmit={this.handleRegistration}>
                        <label htmlFor="regName">Name:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="regName"
                            placeholder="Enter Name"
                            required="" autoFocus="" />
                        <label htmlFor="userPlace">Location:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="userPlace"
                            placeholder="Location"
                            required="" autoFocus="" />
                        <label htmlFor="dreamTrip">Dream Destination:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="dreamTrip"
                            placeholder="Dream Destination"
                            required="" autoFocus="" />
                        <label htmlFor="regEmail">Email:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="regEmail"
                            placeholder=" Enter Email"
                            required="" autoFocus="" />
                        <label htmlFor="regPassword">Password:</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="regPassword"
                            placeholder=" regPassword"
                            required="" autoFocus="" />
                        <button type="submit" className="submit">Register</button>
                    </form>
                </div>
            </>

        )
    }
}
export default withRouter(Register);