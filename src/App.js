import React, { Component } from "react";
import './App.css';
import Navbar from './components/nav/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ApplicationViews from './components/ApplicationViews'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/components/auth/LogReg.css"


class App extends Component {
  state = {
    user: sessionStorage.getItem('activeUser') !== null,
    activeUser: this.getUser()
  };

  isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;

  setUser = id => {
    sessionStorage.setItem('activeUser', id);
    this.setState({ activeUser: this.getUser(), user: true });
  };

  getUser() {
    if (sessionStorage.getItem('activeUser')) {
      return parseInt(sessionStorage.getItem('activeUser'));
    } else {
      return '';
    }
  }

  clearUser = () => {
    sessionStorage.removeItem('activeUser');
    this.setState({
      user: this.isAuthenticated()
    });
  };

  render() {
    return (
      <React.Fragment>
        {(this.state.user) ?
          <>
            <Navbar
              user={this.state.user}
              {...this.props}
              activeUser={this.state.activeUser}
              clearUser={this.clearUser} />
            <ApplicationViews
              getUser={this.getUser}
              user={this.state.user}
              {...this.props}
              activeUser={this.state.activeUser}
            />
          </>
          : <><div className="logRegContainer">
            <Login
              getUser={this.getUser}
              setUser={this.setUser}
              user={this.state.user}
              {...this.props}
              activeUser={this.state.activeUser}
            />
            <Register
              getUser={this.getUser}
              setUser={this.setUser}
              user={this.state.user}
              {...this.props}
              activeUser={this.state.activeUser}
            />
          </div>
          </>}
      </React.Fragment>
    );
  }
}

export default App
