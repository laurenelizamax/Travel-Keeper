import React, { Component } from 'react';
import LogRegManager from '../../modules/LogRegManager'

class AddProfile extends Component {
    state = {
        userName: "",
        userPlace: "",
        userId: "",
        loadingStatus: false,
    };
    activeUser = parseInt(sessionStorage.getItem("userId"))

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
    */
    constructProfile = evt => {
        evt.preventDefault();
        if (this.state.userName === "" || this.state.userPlace === "") {
            window.alert("Please add your username and location");
        } else {
            this.setState({ loadingStatus: true });
            const userProfile = {
                userName: this.state.userName,
                userPlace: this.state.userPlace,
                userId: this.activeUser
            };

            // Create the animal and redirect user to animal list
            LogRegManager.postUserProfile(userProfile)
                // .then(() => this.props.history.push(""));
        }
    };

    render() {
   console.log(this.activeUser)
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="userName">Username:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="userName"
                                placeholder="Username"
                            />
                            <label htmlFor="userPlace">Location:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="userPlace"
                                placeholder="Location"
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructProfile}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default AddProfile