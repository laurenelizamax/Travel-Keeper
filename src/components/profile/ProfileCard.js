import React, { Component } from "react"

class ProfileCard extends Component {

  render() {
        return (
            <>
            <div className="card">
                <div className="card-content">

                    <h1>My Profile</h1>
                        <div>
                            <p>Name: {this.props.userName}</p>
                            <p>Location: {this.props.userPlace}</p>
                            </div>
                </div>
            </div>
            </>
        )
    }
}

export default ProfileCard

