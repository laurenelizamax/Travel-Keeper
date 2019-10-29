import React, { Component } from "react"

class ProfileCard extends Component {

  render() {
        return (
            <>
            <div className="card">
                <div className="card-content">

                    <h1>My Profile</h1>
                        <div>
                            <p>Name: <span className="card">{this.props.user.name}</span></p>
                            <p>Location: {this.props.user.userPlace}</p>
                            <p>Dream Destination: {this.props.user.dreamTrip}</p>
                            </div>
                </div>
            </div>
            </>
        )
    }
}

export default ProfileCard

