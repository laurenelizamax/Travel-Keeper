import React, { Component } from "react"
import "./Navbar.css"

class Navbar extends Component {
    handleLogoutUser = () => {
        this.props.clearUser();
    }

    render() {
        return (
            <nav>
                <h1>TRAVEL KEEPER</h1>
                <span className="logout" onClick={this.handleLogoutUser}>Logout</span>
            </nav>
        )
    }
}
export default Navbar