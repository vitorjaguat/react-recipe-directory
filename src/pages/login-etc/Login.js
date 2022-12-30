import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API_key from '../../secret/API_key';
import AuthContext from '../../context/AuthContext';

import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (!isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_key}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_key}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            //show error modal
            let errorMessage = 'Authentication failed!';
            if (data & data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        console.log(data);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="authentication">
      {isLogin && <h2>Login</h2>}
      {!isLogin && <h2>Signup</h2>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" ref={emailInputRef} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordInputRef} required />
        <button>Submit</button>
      </form>
      {isLogin && (
        <button
          className="toggle-login"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          Create an account
        </button>
      )}
      {!isLogin && (
        <button className="toggle-login" onClick={() => setIsLogin(true)}>
          Already registered?
        </button>
      )}
    </div>
  );
}
