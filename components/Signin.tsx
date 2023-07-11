import React, { useState } from 'react';
import styles from "./Signin.module.css"

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e:any) => {
    e.preventDefault();
   
    if (username !== '' && password !== '') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password details');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}</h2>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
};

export default Signin;