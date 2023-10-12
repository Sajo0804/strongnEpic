import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '../../types/User';

type LoginProps = {
  onLogin: (user: User) => void;
  users: User[];
};

const LoginPage: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Check if loggedInUser exists in mockData
    const existingUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (existingUser) {
      // If the user exists in mockData, perform the login
      onLogin(existingUser as User);
      localStorage.setItem('current user', JSON.stringify(existingUser));
      // Redirect to the landing page
      if (existingUser.role === 'ADMIN') {
        navigate('/admin');
      } else if (existingUser.role === 'USER') {
        navigate('/');
      }
    } else {
      // If the user is not found, display an error message
      setErrorMessage('Fel lösenord eller användarnamn');
    }
  };

  useEffect(() => {
    // Check if a user is already logged in
    const loggedInUser = localStorage.getItem('current user');

    if (loggedInUser) {
      // If a user is logged in, parse the JSON and perform the login
      const parsedUser = JSON.parse(loggedInUser);
      onLogin(parsedUser);
    }
  }, []);

  return (
    <div className='login-page'>
      <div className='banner'> 
        <h1 className='header'>Strong n' Epic</h1>      
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setErrorMessage(''); // Clear any previous error message
          handleLogin(email, password);
        }}
        className='login-form'
      >
        <div>
          <label htmlFor="username">Användarnamn:</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="username"
            placeholder="Användarnamn"
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Lösenord"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submitBtn">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
