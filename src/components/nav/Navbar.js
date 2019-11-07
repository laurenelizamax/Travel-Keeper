import React, { Component } from "react"
import "./Navbar.css"

class Navbar extends Component {
    handleLogoutUser = () => {
        this.props.clearUser();
    }

    render() {
        return (
            <nav>
                <h1 className="siteTitle">T R A V E L &nbsp; K E E P E R</h1>
                <span className="logout" onClick={this.handleLogoutUser}>Logout</span>
            </nav>
        )
    }
}
export default Navbar