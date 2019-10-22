import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class TripAddForm extends Component {

    render () {
        return(
            <>
            <div className="tripAddForm">
                    <div id="tripAddFormHeader"><h3>Add A Trip</h3>
                    </div>
                    <Button id="modalFormBtn" onClick={this.toggle} >{this.props.buttonLabel} Add Another Trip </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.tripName}>
                        <ModalHeader toggle={this.toggle}>Add New Trip</ModalHeader>
                        <ModalBody>
                            <form>
                                <fieldset>
                                    <div className="eventForm">
                                        <label htmlFor="eventName">Title:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="eventName"
                                            placeholder="Event Title"
                                        />
                                        <label htmlFor="date">Date:</label>
                                        <input
                                            type="date"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="date"
                                            placeholder="Date"
                                        />
                                        <label htmlFor="venue">Venue:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="venue"
                                            placeholder="Venue"
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button id="editBtn"
                                onClick={(evt) => {
                                    this.constructNewEvent(evt)
                                    this.toggle()
                                }}>Add New Event</Button>{' '}
                            <Button id="deleteBtn" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="eventCardContainer">
                    {this.state.events.map(event => <EventCard
                        key={event.id}
                        event={event}
                        getData={this.getData}
                        {...this.props} />)}
                </div>
        </>
        )
    }
}
export default TripAddForm