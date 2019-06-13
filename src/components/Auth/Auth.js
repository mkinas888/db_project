

import auth0 from 'auth0-js';
import history from '../../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'mkinas888.eu.auth0.com',
    clientID: 'e77UATOS7iGB4B93fhmIQwvMTUvTpvLN',
    redirectUri: 'http://localhost:3000/login',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  signUp = (userEmail, userName, userPassword) => {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      email: userEmail,
      username: userName,
      password: userPassword
    } , function (err) {
      if (err) {
        console.log(err.description);
        throw new Error(err.description);
      } else {
        return 0;
      }
    });
  }

  login = (userName, userPassword) => {
    const that = this;
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username: userName,
      password: userPassword,
      scope: 'openid',
      responseType: 'code'
    } , function (err, authResult) {
      if (err) {
        throw new Error(err.description);
      } else {
        that.handleAuthentication(err, authResult);
      }
    }
  );
  }

  loginSocial = (socialMediaType) => {
    this.auth0.authorize ({
      connection: socialMediaType
    });
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    clearTimeout(this.tokenRenewalTimeout);
    history.push("/")
  }

  handleAuthentication = (err, authResult) => {
    // If authentication is done correctly move user to main component
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
      history.push("/main");
    } else if (err) {
      history.push("/");
    }
  }

  isAuthenticated = () => {
    // Check if users session is still active
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  setSession = (authResult) => {
    // Set all sesion crucial parameters such as acces token expiration time and user name
    // also move user to main component
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/main');
    });
  }

  getUser = () => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return false;
  }

  getUserName = () => {
    if (this.getUser()) {
      return this.getUser().name;
    }
    return false;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }
}

