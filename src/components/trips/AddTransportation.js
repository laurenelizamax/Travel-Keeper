import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import "./TripForm.css"
// import { Link } from "react-router-dom"


class AddTransportation extends Component {
    state = {
        placeId: this.props.placeId,
        transportationName: "",
        transportationDescription: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    componentDidMount() {
        APIManager.getTripTransportation()
            .then((allTransportations) => {
                this.setState({
                    transportations: allTransportations
                })
            })
    }
    constructNewTransportation = evt => {
        evt.preventDefault();
        if (this.state.transportationName === "" || this.state.transportationDescription === "") {
            window.alert("Please add location");
        } else {
            this.setState({ loadingStatus: true });
            const stay = {
               transportationName: this.state.transportationName,
               transportationDescription: this.state.transportationDescription,
                placeId: this.state.placeId
            }

            APIManager.postTransportation(stay)
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
                        <h4>Add Transportation</h4>
                            <div className="tripForm">
                                {/* Transportation  input*/}
                                <label htmlFor="transportationName">Transportation:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="transportationName"
                                    placeholder="Transportation"
                                />
                                {/* Transportation Description input*/}
                                <label htmlFor="transportationDescription">Transportation Description:</label>
                                <input
                                    type="text"
                                    required
                                    onChange={this.handleFieldChange}
                                    id="transportationDescription"
                                    placeholder="Transportation Description"
                                />
                                {/* Button to create new location*/}
                                <button
                                    type="submit"
                                    className="cardButton"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.constructNewTransportation}
                                >Add A Transportation</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </>
        )
    }
}
export default AddTransportation