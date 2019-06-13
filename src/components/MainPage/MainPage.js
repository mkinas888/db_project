import React, { Component } from 'react';
import Auth from "../Auth/Auth";
import history from '../../history';
import './MainPage.scss';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      auth: new Auth(),
      isUserLoggedIn: true,
      currentuser: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("calledd", nextProps.location.state.user);
    this.setState({
      currentuser: nextProps.location.state.user
    });
    this.checkIfUserLoggedIn();
  }

  componentDidMount() {
    this.checkIfUserLoggedIn();
    if(!this.state.isUserLoggedIn) {
      history.push("/login");
    }
  }

  checkIfUserLoggedIn = () => {
    let isLogged = true;
    if( Object.keys(this.state.currentuser).length === 0 && this.state.currentuser.constructor === Object) {
      isLogged = false;
    }
    this.setState({
      isUserLoggedIn: isLogged
    });
  }

  logout = () => {
    history.push("/login");
  }

  navigateToProfile = () => {
    const user = this.props.location.state.user
    history.push({pathname: "/profile", state: {user}});
  }

  navigateToSteps = () => {
    const user = this.props.location.state.user
    history.push({pathname: "/steps", state: {user}});
  }

  render() {
    return (
      <div className="MainPage">
        <ul id="nav">
        <button className="profile" type="button" onClick={this.navigateToProfile}> Your profile</button>
        <button className="logout" type="button" onClick={this.logout}> Logout</button>
        </ul>
        <div className="MainPage-header">
          <h1>Welcome to DB Project!</h1>
        </div>
        <div className="MainPage-content">
          <div className="instruction">
            <h2> Instructions </h2>
            <p>Choose problematic body part and then answer few questions</p>
          </div>
          <div className="photo-container">
            <button className="photo-button-1" type="button" onClick={this.navigateToSteps}></button>
            <button className="photo-button-2" type="button" onClick={this.navigateToSteps}></button>
            <button className="photo-button-3" type="button" onClick={this.navigateToSteps}></button>
            <button className="photo-button-4" type="button" onClick={this.navigateToSteps}></button>
            <button className="photo-button-5" type="button" onClick={this.navigateToSteps}></button>
            <button className="photo-button-6" type="button" onClick={this.navigateToSteps}></button>
          </div>
        </div>
      </div>
    );
  }
}
