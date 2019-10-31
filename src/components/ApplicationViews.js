import { Route } from "react-router-dom"
import React, { Component } from "react"
// import ProfileList from "./profile/ProfileList"
import ProfileCard from "./profile/ProfileCard"
// import FriendsList from "./friends/FriendsList"
import TripList from "./trips/TripList"
import TripDetails from "./trips/TripDetails"
// import TripAddForm from "./trips/TripAddForm"
import TripEditForm from "./trips/TripEditForm"
import LocationDetails from "./trips/LocationDetails"

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
                                {/* <ProfileList {...props} /> */}
                                <ProfileCard activeUser={this.props.activeUser}/>
                                <TripList activeUser={this.props.activeUser}{...props} />
                            </section>
                            {/* <section className="rightSection">
                                <FriendsList {...props} />
                            </section> */}
                        </div>
                    )
                }
                } />
                {/* path for Animal Detail */}
                <Route exact path="/trips/:tripId(\d+)" render={(props) => {
                    return <TripDetails tripId={parseInt(props.match.params.tripId)} activeUser={this.props.activeUser} {...props} />
                }} />
                 <Route exact path="/places/:placeId(\d+)" render={(props) => {
                    return <LocationDetails placeId={parseInt(props.match.params.placeId)} activeUser={this.props.activeUser} 
                    {...props} />
                }} />
                {/* <Route exact path="/trip/new" render={(props) => {
                    return <TripAddForm activeUser={this.props.activeUser} {...props} />
                }} /> */}
                <Route
                    exact path="/trips/:tripId(\d+)/edit" render={props => {
                        return <TripEditForm activeUser={this.props.activeUser} {...props} />
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