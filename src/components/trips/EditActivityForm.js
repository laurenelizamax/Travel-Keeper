import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

class EditActivityForm extends Component {
    //set the initial state
    state = {
        activityName: "",
        activityDescription: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingActivity = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedActivity = {
            id: this.props.activityId,
            activityName: this.state.activityName,
            activityDescription: this.state.activityDescription,
            placeId: this.props.placeId
        };

        APIManager.updateActivity(editedActivity)
            .then(() => this.props.getData())

    }
    componentDidMount() {
        // console.log(this.props)
        APIManager.getOneActivity(this.props.activityId)
            .then(activities => {
                this.setState({
                    activityName: activities.activityName,
                    activityDescription: activities.activityDescription,
                    placeId: this.props.placeId,
                    loadingStatus: false
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <h4>Edit Activities</h4>
                        <label htmlFor="activityName">Activity: </label>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="activityName"
                                value={this.state.activityName}
                            />
                            <label htmlFor="activityDescription">Activity Description: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="activityDescription"
                                value={this.state.activityDescription}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingActivity}
                                className="btn btn-primary"
                            >Save Activity</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EditActivityForm

