import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"

class Register extends Component {
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
    handleRegisterUser = (e) => {
        e.preventDefault()
        LogRegManager.getUserInfo().then((users) => {
            let validateUser = users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())
            if (this.state.name === "") {
                window.alert("Please enter your name")
            } else if (this.state.email === "") {
                window.alert("Please enter your email address")
            } else if (this.state.password === "") {
                window.alert("Please enter your password")
            } else if (validateUser) {
                window.alert("That email address already exists")
            } else {
                let newUser = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                };
                LogRegManager.createNewUser(newUser)
                    .then((createdNewUser) => {
                        this.props.setUser(createdNewUser)
                    }
                    )
            }
        }
        )
    }


    render() {
        return (
            <>
                <div className="logRegForm">
                    <h3 className="logRegTitle">Register!</h3>
                    <form onSubmit={this.handleRegisterUser}>
                        <label htmlFor="name">Name:</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="name"
                            placeholder="Name"
                            required="" autoFocus="" />
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
                        <button className="submit">Register</button>
                    </form>
                </div>
            </>

        )
    }
}
export default Register