import React, { useEffect, useState } from 'react';
import { GymClass } from '../types/GymClass';
import { getUserById } from '../services/userService';
import { formatDate, getMinutes } from '../utils/utils';

type GymClassTableProps = {
  classes: GymClass[];
  onDeleteClass: (classId: number) => void;
};

const GymClassTable: React.FC<GymClassTableProps> = ({ classes, onDeleteClass }) => {
  const [usersData, setUsersData] = useState<Record<number, string>>({});

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUsersData = async () => {
      // store data with keys are type number and values are type string
      const userData: Record<number, string> = {};
      for (const cls of classes) {
        for (const userId of cls.bookedUsers) {
          if (!userData[userId]) {
            const user = getUserById(userId);
            if (user) {
              userData[userId] = user.email;
            }
          }
        }
      }
      setUsersData(userData);
    };

    fetchUsersData();
  }, [classes]);
  
  
  return (
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Pass</th>
          <th>Tid</th>
          <th>Varaktighet</th>
          <th>Bokade platser</th>
          <th>Bokningar</th>
          <th>Åtgärder</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((cls) => (
          <tr key={cls.id}>
            <td>{formatDate(cls.date)}</td>
            <td>{cls.name}</td>
            <td>{cls.starttime} - {cls.endtime}</td>
            <td>{getMinutes(cls.starttime, cls.endtime)} min</td>
            <td>
              {cls.bookedUsers.length} / {cls.capacity}
            </td>
            <td>
              <ul>
                {cls.bookedUsers.map((userId) => (
                  <li key={userId}>{usersData[userId]}</li>
                ))}
              </ul>
            </td>
            <td>
              <button className='bookBtn' onClick={() => onDeleteClass(cls.id)}>
                Radera
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GymClassTable;
