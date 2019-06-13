import React, { Component } from "react";
import Auth from "../Auth/Auth";
import axios from 'axios';
import history from "../../history";
import "./Login.scss";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(),
      isRightOverlayed: true,
      userSignUpName: '',
      userSignUpLogin: '',
      userSignUpPassword: '',
      userSignInLogin: '',
      userSignInPassword: '',
      userSignUpSurname: '',
      isUserLoggedIn: this.props.isLogged,
      currentUser: {}
    };
  }

  componentDidMount() {
    const { auth } = this.state;
    const isLogged = auth.isAuthenticated();
    if(isLogged) {
      history.push("/main");
    }
  }

  toggleOverlay = () => {
    this.setState((state) => ({
      isRightOverlayed: !state.isRightOverlayed
    }));
  }

  updateSignUpName = (event) => {
    this.setState({
      userSignUpName: event.target.value
    });
  }

  updateSignUpLogin = (event) => {
    this.setState({
      userSignUpLogin: event.target.value
    });
  }

  updateSignUpSurname = (event) => {
    this.setState({
      userSignUpSurname: event.target.value
    });
  }

  updateSignUpPassword = (event) => {
    this.setState({
      userSignUpPassword: event.target.value
    });
  }

  updateSignInLogin = (event) => {
    this.setState({
      userSignInLogin: event.target.value
    });
  }

  updateSignInPassword = (event) => {
    this.setState({
      userSignInPassword: event.target.value
    });
  }  

  getUser = (userLogin) => {
    axios.get('http://localhost:4000/users/' + userLogin)
    .then(res => {
      const user = res.data[0];
      console.log(user);
      user.Last_Login_Date = new Date();
      this.setState({currentUser: user});
    });
  }

  checkUserPassword = (userPasswordTyped, userPasswordDB) => {
    if(userPasswordTyped === userPasswordDB) {
      return true;
    } else {
      return false;
    }
  }

  signUp = () => {
    const { userSignUpSurname, userSignUpName, userSignUpPassword, userSignUpLogin } = this.state;
    const newUser = {
      login: userSignUpLogin,
      creation_date: new Date(),
      name: userSignUpName,
      password: userSignUpPassword,
      surname: userSignUpSurname,
      last_login_date: new Date()
    };
    axios.post('http://localhost:4000/users', newUser);
    window.setTimeout(() => {
      this.getUser(newUser.login);
      history.push({pathname: "/main", state: {newUser}});
    }, 1000);
  }

  login = () => {
    this.getUser(this.state.userSignInLogin);
    window.setTimeout(() => {
      if(this.checkUserPassword(this.state.userSignInPassword, this.state.currentUser.Password)) {
        const user = this.state.currentUser
        history.push({pathname: "/main", state: {user}});
      } else {
        this.setState({
          userSignInLogin: "",
          userSignInPassword: ""});
          alert("Wrong password or login!");
      }
    }, 1000);
  }

  loginWithSocialMedia = (socialMediaType) => {
    const {state} = this.state;
    state.auth.loginSocial(socialMediaType);
  }
 
  render() {
    let overlayClass = "container"
    const { isRightOverlayed, userSignInLogin, userSignInPassword, userSignUpSurname,
            userSignUpLogin, userSignUpName, userSignUpPassword } = this.state;
    if (!isRightOverlayed) {
      overlayClass += " right-panel-active";
    }
    return (
      <div className="background-container">
        <div className={overlayClass} id="container">
          <div className="form-container sign-up-container" id="signUp">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <button type="button" className="social fb" onClick={() => {this.loginWithSocialMedia('facebook')}} />
                <button type="button" className="social g" onClick={() => {this.loginWithSocialMedia('google-oauth2')}} />
                <button type="button" className="social git" onClick={() => {this.loginWithSocialMedia('github')}} />
              </div>
              <span>or use your email for registration</span>
              <div className="group">
                <input type="text" value={userSignUpName} onChange={this.updateSignUpName} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Name</span>
              </div>
              <div className="group">
                <input type="text" value={userSignUpSurname} onChange={this.updateSignUpSurname} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Surname</span>
              </div>
              <div className="group">
                <input type="text" value={userSignUpLogin} onChange={this.updateSignUpLogin} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Login</span>
              </div>
              <div className="group">
                <input type="password" value={userSignUpPassword} onChange={this.updateSignUpPassword} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Password</span>
              </div>
              <button type="submit" className="gradient-bg" onClick={this.signUp}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container" id="signIn">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <button type="button" className="social fb" onClick={() => {this.loginWithSocialMedia('facebook')}} />
                <button type="button" className="social g" onClick={() => {this.loginWithSocialMedia('google-oauth2')}} />
                <button type="button" className="social git" onClick={() => {this.loginWithSocialMedia('github')}} />
              </div>
              <span>or use your account</span>
              <div className="group">
                <input type="text" value={userSignInLogin} onChange={this.updateSignInLogin} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Login</span>
              </div>
              <div className="group">
                <input type="password" value={userSignInPassword} onChange={this.updateSignInPassword} required />
                <span className="highlight" />
                <span className="bar" />
                <span className="label">Password</span>
              </div>
              <a className="forgot-password" href="https://www.google.com/search?client=firefox-b-d&q=forgot+password">
                Forgot your password?
              </a>
              <button type="submit" className="gradient-bg" onClick={this.login}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p className="margin-side">
                    To keep connected with us please login with your personal info
                </p>
                <button type="button" className="ghost" id="signIn" onClick={this.toggleOverlay}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Welcome !</h1>
                <p className="margin-side">Enter your personal details and get your posture fixed</p>
                <button type="button" className="ghost" id="signUp" onClick={this.toggleOverlay}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
