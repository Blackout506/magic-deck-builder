import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START
  };
};

export const signInSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const signInFail = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    error: error
  };
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime * 1000);
  };
};

export const signIn = (email, password, isSignup) => {
  return dispatch => {
    dispatch(signInStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC40hLnHWzFIQcfCx46mmyrpKpKejm14po"
    if (!isSignup) {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC40hLnHWzFIQcfCx46mmyrpKpKejm14po"
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(signInSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(signInFail(err.response.data.error));
      })
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(signOut());
    }
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(signOut());
      }
      else {
        const userId = localStorage.getItem('userId');
        dispatch(signInSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};