import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class AddLodging extends Component {
    state = {
        placeId: this.props.placeId,
        stayName: "",
        stayDescription: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripAccommodations(2)
            .then((allStays) => {
                console.log(allStays)
                this.setState({
                    accommodations: allStays
                })
            })
    }
    constructNewStay = evt => {
        evt.preventDefault();
        if (this.state.stayName === "" || this.state.stayDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const stay = {
               stayName: this.state.stayName,
               stayDescription: this.state.stayDescription,
                placeId: this.state.placeId
            }

            APIManager.postStay(stay)
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
                                {/* Accommodations  input*/}
                                <label htmlFor="stayName">Accommodation:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="stayName"
                                    placeholder="Accommodation"
                                />
                                {/* Accommodations Description input*/}
                                <label htmlFor="stayDescription">Accommodation Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="stayDescription"
                                    placeholder="Accommodation Description"
                                />
                                {/* Button to create new location*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewStay}
                                >Add Location</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default AddLodging