import React, { useState, useEffect } from 'react';
import './Login.css';
import './HeaderStyle.css';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulating sign-in logic
    if (email === 'saad@gmail.com' && password === '12345') {
      // Save user data to local storage
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
      navigate('/Header');
    } else {
      console.log('Sign-in failed. Invalid email or password.');
    }
  };

  useEffect(() => {
    // Retrieve saved user data from local storage on component mount
    const savedEmail = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  return (
    <div>
      {/* <header className='header'>
        <div className='img'>
          <img src='burger.jpg' alt='myburger' />
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/Header" aria-current="true">Builder Burger</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav>
      </header> */}
      {/* <Header/> */}
{/* 
      <main className='main'> */}
        <div className='Auth'>
          <form onSubmit={handleLogin}>
            <div className='Input'>
              <label className="InputLable">
                <input
                  className='InputEle'
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="InputLable">
                <input
                  className='InputEle'
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button className='Button' type="submit">SUBMIT</button>
          </form>
          {/* {isLoggedIn ? (
            <p>Sign-in successful!</p>
          ) : (
            <p>Sign-in failed. Invalid email or password.</p>
          )} */}
        </div>
      {/* </main> */}
    </div>
  );
}

export default Login;
