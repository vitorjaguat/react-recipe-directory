import React, { useState } from 'react';

const AuthContext = React.createContext({
  uid: '',
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

//helper function to calculate remaining time using stored expirationTime and current time
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); //get the current timestamp in miliseconds
  const adjustedExpTime = new Date(expirationTime).getTime(); //convert expirationTime to a timestamp (ms)

  const remainingDuration = adjustedExpTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);

  const initialUid = localStorage.getItem('uid');

  const [uid, setUid] = useState(initialUid);

  const userIsLoggedIn = !!token; //if token is truthy, it'll return true; if token is falsy, it'll return false.

  const logoutHandler = () => {
    setToken(null);
    setUid(null);
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  };

  const loginHandler = (token, expirationTime, uid) => {
    setToken(token);
    localStorage.setItem('token', token);

    setUid(uid);
    localStorage.setItem('uid', uid);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    uid: uid,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
