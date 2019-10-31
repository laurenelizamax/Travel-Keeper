import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
import { withRouter} from "react-router-dom"
import { Button } from "reactstrap"


class Login extends Component {
    state = {
        email: "",
        password: "",
    }
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleLogin = e => {
        // console.log("hi" ,this.handleLogin)
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		LogRegManager.getOneUser(email).then(response => {
            // console.log("hi")
			if (response.length === 0) {
				alert('Please enter a valid Email.');
			} else if (response.length === 1 && response[0].password !==password) {
				alert('Password is incorrect, please try again.');
				// starting the if statement to check for empty fields//
			} else if (password === '') {
				alert('Please fill the Password Form');
			} else if (email === '') {
				alert('Please enter a valid email address');
			} else if (response[0].password === password) {
				//response[0].id is the ID of the user you logged in with,
				this.props.setUser(response[0].id);
				this.props.history.push("/");
			}
		});
	};
    
    render() {
        return (
            <>
                <div className="logRegForm">
                    <h3 className="logRegTitle">Login!</h3>
                    <form onSubmit={this.handleLogin}>
                        <label htmlFor="email">Email:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="email"
                            placeholder="Email"
                            required="" autoFocus="" />
                        <label htmlFor="password">Password:</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" autoFocus="" />
                        <Button type="submit" className="submit">Login</Button>
                    </form>
                </div>
            </>

        )
    }
}
export default withRouter(Login);