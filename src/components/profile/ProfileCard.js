import React, { Component } from "react"
import LogRegManager from "../../modules/LogRegManager"
// import ModalTest from "../trips/ModalTest"

class ProfileCard extends Component {
    state = {
        name: "",
        userPlace: "",
        dreamTrip: "",
        userId: this.props.activeUser,
        loaded: false
    }
    componentDidMount = () => {
        console.log("profilecard" ,this.props.activeUser)
        LogRegManager.getUserProfile(this.props.activeUser)
            .then((res) => {
                console.log("res", res)
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
                <div className="card">
                    <div className="card-content">
                        <h1>My Profile</h1>
                        <div>
                            <p>Name: <span className="card">{this.state.name}</span></p>
                            <p>Location: {this.state.userPlace}</p>
                            <p>Dream Destination: {this.state.dreamTrip}</p>
                        </div>
                    </div>
                </div>
            }
            </>
        )
    }
}

export default ProfileCard

