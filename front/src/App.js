import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import SignInWithFormik from './components/SignIn/SignInWithFormik';
import SignUpWithFormik from './components/SignUp/SignUpWithFormik';
import Main from './components/Main/Main';
import bg from './img/bg.jpg';
import axios from './axios/axios'
import localStorageService from './axios/localStorageService';

const bgStyle = {
  zIndex: '-100',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `url(${bg}) no-repeat center`,
  backgroundSize: 'cover',
  filter: 'blur(30px)'
};

const headerStyle = {
  color: '#303030',
  textAlign: 'center',
  marginTop: '50px',
  textTransform: 'uppercase'
}

const paragraphStyle = {
  fontSize: '20px'
}

const greetingStyle = {
  background: 'linear-gradient(#e2e2e2, #c9c9c9)',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: '0 0 10px 10px',
  color: '#303030',
}

const buttonStyle = {
  background: 'linear-gradient(#91c8ac, #548d6c)',
  border: 'none'
}

function App() {

  const [isAuth, setIsAuth] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get('/check-token')
      .then((res) => {
        setUsername(res.data.username);
        setIsAuth(true);
      })
      .catch((err) => {
        setIsAuth(false)
      })
  }, []);

  const signingIn = (username) => {
    setUsername(username);
    setIsAuth(true);
  }

  const logOutHandler = () => {
    axios.post('/logout')
      .then((res) => {
        axios.defaults.headers.common['Authorization'] = '';
        localStorageService.clearToken();
        setUsername('');
        setIsAuth(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

  };

  return (
    <div>
      <Container>
        {isAuth && <header style={greetingStyle}>
          <h4>Hello, {username}</h4>
          <Button style={buttonStyle} onClick={logOutHandler}>Log out</Button>
        </header>}
        <div style={headerStyle}>
          <h1>Simple TODO List</h1>
          <p style={paragraphStyle}>From RubyGarage</p>
        </div>
        <Route path='/signin' component={() => <SignInWithFormik isAuth={isAuth} setIsAuth={signingIn} />} exact />
        <Route path='/signup' component={() => <SignUpWithFormik isAuth={isAuth} />} exact />
        <Route path='/' component={() => <Main isAuth={isAuth} />} exact />
      </Container>
      <div style={bgStyle}>
      </div>
    </div>
  );
}

export default App;
