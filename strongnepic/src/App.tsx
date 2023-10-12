import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/pages/BookingPage';
import AdminPage from './components/pages/AdminPage';
import LoginPage from './components/pages/LandingPage';
import { User } from './types/User';
import Banner from './components/Banner';
import { Booking } from './types/Booking';
import { GymClass } from './types/GymClass';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/lollocodes/mockupServer/main/mockData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.classes && data.users) {
          setClasses(data.classes);
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const addBooking = (booking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, booking]);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Router>
      <div>
        {!user ? (
          <LoginPage users={users} onLogin={handleLogin} />
        ) : (
          <>
            <Banner onLogout={handleLogout} user={user} />
            <Routes>
              <Route path="/" element={<LandingPage setUser={setUser} user={user} classes={classes} />} />
              <Route path="/admin" element={<AdminPage setClasses={setClasses} users={users} classes={classes} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
