import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"

class Login extends Component {
    state = {
        email: "",
        password: "",
        id: "",
    }
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleLoginUser = (e) => {
        e.preventDefault()
        LogRegManager.getUserInfo("users").then((users) => {
            let loginUser = users.find(
                user =>
                    user.password.toLowerCase() === this.state.password.toLowerCase() &&
                    user.email.toLowerCase() === this.state.email.toLowerCase()
            );
            if (this.state.email === "") {
                window.alert("Please enter your email")
            } else if (this.state.password === "") {
                window.alert("Please enter your password")
            } else if (loginUser) {
                this.props.setUser(loginUser);
            } else {
                window.alert("You have not registered yet")
            }
        })

    }
    render() {
        return (
            <>
                <div className="logRegForm">
                    <h3 className="logRegTitle">Login!</h3>
                    <form onSubmit={this.handleLoginUser}>
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
                        <button className="submit">Login</button>
                    </form>
                </div>
            </>

        )
    }
}
export default Login