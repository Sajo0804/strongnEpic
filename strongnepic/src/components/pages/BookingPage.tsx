import React, { useEffect } from 'react';
import { User } from '../../types/User';
import BookedClassesTable from '../BookedClassesTable';
import UpcomingClassesTable from '../UpcomingClassesTable';
import { GymClass } from '../../types/GymClass';
import { useNavigate } from 'react-router';

type LandingPageProps = {
  user: User;
  classes: GymClass[];
  setUser: (user: User) => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ user, classes, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      navigate('/admin');
    } else if (user?.role === 'USER') {
      navigate('/');
    }
  }, [user, navigate]);

  const bookClass = (selectedClass: GymClass, user: User) => {
    // Check if the user have already booked the class
    if (user.bookedClasses?.some((bookedClass) => bookedClass === selectedClass.id)) {
      alert('Du har redan bokat detta pass');
      return;
    } else if (selectedClass.bookedUsers.length < selectedClass.capacity) {
      // Add user to the class bookedUsers
      selectedClass.bookedUsers?.push(user.id);
      // Decrease class capacity
      selectedClass.capacity -= 1;
      // Add class to users bookedClasses
      user.bookedClasses?.push(selectedClass.id);
      // Update user state
      setUser({ ...user });
    } else {
      alert('Passet är fullbokat');
    }
  };

  const unBookClass = (selectedClass: GymClass, user: User) => {
    const index = user.bookedClasses.findIndex((bookedClass) => bookedClass === selectedClass.id);
    if (index !== -1) {
      // remove class from users bookedClasses
      user.bookedClasses.splice(index, 1);
      // Remove user from class bookedUsers
      selectedClass.bookedUsers.splice(index, 1);
      // Increase class capacity
      selectedClass.capacity += 1;
      // Update user state
      setUser({ ...user });
    }
  };

  return (
    <>
      <section>
        <h2>Dina bokade pass</h2>
        <BookedClassesTable user={user} unBookClass={unBookClass} />
      </section>
      <section>
        <h2>Kommande pass</h2>
        <UpcomingClassesTable user={user} classes={classes} bookClass={bookClass} />
      </section>
    </>
  );
};

export default LandingPage;
