import React from 'react';
import { GymClass } from '../types/GymClass';
import { User } from '../types/User';
import { formatDate, getMinutes } from '../utils/utils';

type UpcomingClassesTableProps = {
  user: User;
  classes: GymClass[];
  bookClass: (selectedClass: GymClass, user: User) => void;
};

const UpcomingClassesTable: React.FC<UpcomingClassesTableProps> = ({ user, classes, bookClass }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Datum</th>
          <th>Namn</th>
          <th>Tid</th>
          <th>Varaktighet</th>
          <th>Bokade platser</th>
          <th>Åtgärder</th>
        </tr>
      </thead>
      <tbody className="bookList">
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
              {cls.bookedUsers.length < cls.capacity && (
                <button onClick={() => bookClass(cls, user)} className="bookBtn">
                  Boka
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpcomingClassesTable;
