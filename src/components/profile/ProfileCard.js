import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
import "./Profile.css"

class ProfileCard extends Component {
    state = {
        name: "",
        userPlace: "",
        dreamTrip: "",
        userId: this.props.activeUser,
        loaded: false
    }
    componentDidMount = () => {
        // console.log("profilecard" ,this.props.activeUser)
        LogRegManager.getUserProfile(this.props.activeUser)
            .then((res) => {
                // console.log("res", res)
                this.setState({ 
                    name: res.name,
                    userPlace: res.userPlace,
                    dreamTrip: res.dreamTrip,
                    loaded: true
                })
            })
    }
    
    render() {
        return (
            <>{this.state.loaded &&
                // <div className="card">
                    <div>
                        <h1>My Profile</h1>
                        <div>
                            <h6><strong>Name:</strong> {this.state.name}</h6>
                            <h6><strong>Location: </strong>{this.state.userPlace}</h6>
                            <h6><strong>Dream Destination:</strong> {this.state.dreamTrip}</h6>
                        </div>
                    </div>
                // </div>
            }
            </>
        )
    }
}

export default ProfileCard

