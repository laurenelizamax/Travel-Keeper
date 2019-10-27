import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class AddTravelers extends Component {
    state = {
        tripId: this.props.tripId,
        travelerName: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripTravelers()
            .then((allTravelers) => {
                this.setState({
                    travelers: allTravelers
                }
                )
            })
    }
    constructNewTraveler= evt => {
        evt.preventDefault();
        if (this.state.travelerName === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const traveler = {
               travelerName: this.state.travelerName,
                tripId: this.state.tripId
            }

            APIManager.postTraveler(traveler)
            .then(() => {
                this.props.getData()
                this.setState({ loadingStatus: false});
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
                                {/* Fellow Travelers  input*/}
                                <label htmlFor="travelerName">Fellow Traveler:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="travelerName"
                                    placeholder="Fellow Traveler"
                                />
                                {/* Button to create new traveler*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewTraveler}
                                >Add A Traveler</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default AddTravelers