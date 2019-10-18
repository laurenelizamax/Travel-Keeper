import { Route } from "react-router-dom"
import React, { Component } from "react"
import Profile from "./profile/Profile"
import FriendsList from "./friends/FriendsList"
import TripList from "./trips/TripList"

class ApplicationViews extends Component {

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return (
                        <div className="main">
                            <section className="leftSection">
                            </section>
                            <section className="mainSection">
                                <Profile {...props} />
                                <TripList {...props} />
                            </section>
                            <section className="rightSection">
                                <FriendsList {...props} />
                            </section>
                        </div>
                    )
                }
                } />
            </React.Fragment>
        );
    }
}
export default ApplicationViews