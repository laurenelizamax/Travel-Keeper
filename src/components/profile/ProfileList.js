import React, { Component } from 'react'
//import the components we will need
import ProfileCard from './ProfileCard'
import LogRegManager from '../../modules/AnimalManager'

class ProfileList extends Component {
    state = {
       users: [],
        userId: ""
    }
    activeUser = parseInt(sessionStorage.getItem("userId"))

    componentDidMount() {
        LogRegManager.getAllUsers()
            .then((users) => {
                this.setState({
                    users: users
                })
            })
    }


    render() {
        return (
            <>
            < section className = "section-content" >
            <button type="button"
                className="btn"
                onClick={() => { this.props.history.push("/users/new") }}>
                Add User Info
      </button>
    </section >
            <div className="container-cards">
                {this.state.users.map(user => <ProfileCard
                    key={user.id}
                    user={user}
                    {...this.props}
                />)}
            </div>
            </>
        )
    }
}

export default ProfileList
