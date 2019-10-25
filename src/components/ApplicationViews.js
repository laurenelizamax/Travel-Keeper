import { Route } from "react-router-dom"
import React, { Component } from "react"
import ProfileList from "./profile/ProfileCard"
import FriendsList from "./friends/FriendsList"
import TripList from "./trips/TripList"
import TripDetails from "./trips/TripDetails"
import TripAddForm from "./trips/TripAddForm"
import TripEditForm from "./trips/TripEditForm"
import AddProfile from "./profile/AddProfile"

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
                                <ProfileList {...props} />
                                <AddProfile />
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
                <Route exact path="/trip/new" render={(props) => {
                    return <TripAddForm {...props} />
                }} />
                <Route
                    exact path="/trips/:tripId(\d+)/edit" render={props => {
                        return <TripEditForm {...props} />
                    }}
                />
                {/* <Route exact path="/profile/new" render={(props) => {
                    return <AddProfile {...props} />
                }} /> */}
            </React.Fragment>
        );
    }
}
export default ApplicationViews