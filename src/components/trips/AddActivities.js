import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class AddActivities extends Component {
    state = {
        placeId: this.props.placeId,
        activityName: "",
        activityDescription: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripActivities()
            .then((allActivities) => {
                this.setState({
                    activities: allActivities
                })
            })
    }
    constructNewActivity = evt => {
        evt.preventDefault();
        if (this.state.activityName === "" || this.state.activityDescription === "") {
            window.alert("Please add an activity");
        } else {
            this.setState({ loadingStatus: true });
            const activity = {
                activityName: this.state.activityName,
                activityDescription: this.state.activityDescription,
                placeId: this.state.placeId
            }

            APIManager.postActivity(activity)
                .then(() => {
                    this.props.getData()
                    this.setState({ loadingStatus: false });
                })
            // .then(() => {this.props.history.push("/")});
        }
    }

    render() {
        return (
            <>

                <div>
                    <form className="tripAddForm">
                        <fieldset>
                            <div className="tripForm">
                                {/* Activities input*/}
                                <label htmlFor="activityName">Activity:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityName"
                                    placeholder="Activities"
                                />
                                {/* Activities Description input*/}
                                <label htmlFor="activityDescription">Activity Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="activityDescription"
                                    placeholder="Activity Description"
                                />
                                {/* Button to create new activity*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewActivity}
                                >Add An Activity</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default AddActivities