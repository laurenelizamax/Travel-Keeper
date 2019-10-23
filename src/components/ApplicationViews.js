import { Route } from "react-router-dom"
import React, { Component } from "react"
import Profile from "./profile/Profile"
import FriendsList from "./friends/FriendsList"
import TripList from "./trips/TripList"
import TripDetails from "./trips/TripDetails"
import TripAddForm from "./trips/TripAddForm"

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
                  {/* path for Animal Detail */}
        <Route exact path="/trips/:tripId(\d+)" render={(props) => {
          return <TripDetails tripId={parseInt(props.match.params.tripId)} {...props} />
        }} />
        <Route path="/trip/new" render={(props) => {
          return <TripAddForm {...props} />
        }} />
            </React.Fragment>
        );
    }
}
export default ApplicationViews