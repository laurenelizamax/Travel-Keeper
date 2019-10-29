import React, { Component } from 'react'
import ProfileCard from './ProfileCard'
import LogRegManager from '../../modules/LogRegManager'

class ProfileList extends Component {
    state = {
       users: [],
       userId: ""
    }
    activeUser = parseInt(sessionStorage.getItem("userId"))

    componentDidMount() {
        LogRegManager.getAllUsers(this.activeUser)
            .then((users) => {
                this.setState({
                    users: users
                })
            })
    }


    render() {
        // console.log(this.state)

        return (
            <>
            <div className="container-cards">
                {this.state.users.map(user => <ProfileCard
                    key={user.id}
                    user={user}
                    userId={user.id}
                    {...this.props}
                />)}
            </div>
            </>
        )
    }
}

export default ProfileList
