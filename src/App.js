import React, { Component } from "react";
import './App.css';
import Navbar from './components/nav/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ApplicationViews from './components/ApplicationViews'

class App extends Component {
  state = {
    user: false
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  setUser = (authObj) => {
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }
  clearUser = () => {
    sessionStorage.clear()
    this.setState({
      user: this.isAuthenticated()
    });
  }

  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }

render() {
  return (
    <React.Fragment>
      {(this.state.user) ?
        <>
          <Navbar clearUser={this.clearUser} />
          <ApplicationViews />
        </>
        : <><div className="logRegContainer">
          <Login setUser={this.setUser} />
          <Register setUser={this.setUser} />
        </div>
        </>}
    </React.Fragment>
  );
}
}

export default App
