import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
import { withRouter} from "react-router-dom"
import { Button } from "reactstrap"
import "./LogReg.css"
// import Register from './Register'


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
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		LogRegManager.getOneUser(email).then(response => {
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
                    <h1>T R A V E L &nbsp; K E E P E R</h1>
                    <h3 className="logRegTitle">Login</h3>
                    <form onSubmit={this.handleLogin}>
                        <label htmlFor="email">Email:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="email"
                            placeholder="Email"
                            required="" autoFocus="" />
                            <br></br>
                        <label htmlFor="password">Password:</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" autoFocus="" />
                            <br></br>
                        <Button className="logBtn" type="submit">Login</Button>
                  
                {/* <Register
              getUser={this.getUser}
              setUser={this.setUser}
              user={this.state.user}
              {...this.props}
              activeUser={this.state.activeUser}
            /> */}
              </form>
                </div>
            </>

        )
    }
}
export default withRouter(Login);