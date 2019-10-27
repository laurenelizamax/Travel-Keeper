import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class AddLocation extends Component {
    state = {
        tripId: this.props.tripId,
        placeName: "",
        placeDescription: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripPlaces()
            .then((allPlaces) => {
                this.setState({
                    places: allPlaces
                }
                )
            })
    }
    constructNewLocation = evt => {
        evt.preventDefault();
        if (this.state.placeName === "" || this.state.placeDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const place = {
               placeName: this.state.placeName,
               placeDescription: this.state.placeDescription,
                tripId: this.state.tripId
            }

            APIManager.postLocation(place)
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
                                {/* Location  input*/}
                                <label htmlFor="placeName">Location:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="placeName"
                                    placeholder="Location"
                                />
                                {/* Location Description input*/}
                                <label htmlFor="placeDescription">Location Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="placeDescription"
                                    placeholder="Location Description"
                                />
                                {/* Button to create new location*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewLocation}
                                >Add Location</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default AddLocation