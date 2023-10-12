import React from 'react';
import { GymClass } from '../types/GymClass';
import { User } from '../types/User';
import { getClassById } from '../services/userService';
import { formatDate, getMinutes } from '../utils/utils';

type BookedClassesTableProps = {
  user: User;
  unBookClass: (selectedClass: GymClass, user: User) => void;
};

const BookedClassesTable: React.FC<BookedClassesTableProps> = ({ user,  unBookClass }) => {
  return (
    <>
    {user.bookedClasses?.length ? ( 
        <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Datum</th>
            <th>Tid</th>
            <th>Varaktighet</th>
            <th>Åtgärder</th>
          </tr>
        </thead>
        <tbody className="bookList">
          {user.bookedClasses?.map((id) => {
            const cls = getClassById(id);
            return (
              <tr key={cls?.id}>
                <td>{cls?.name}</td>
                <td>{cls?.date ? formatDate(cls.date) : ''}</td>
                <td>{cls?.starttime} - {cls?.endtime}</td>
                <td>{cls?.starttime && cls?.endtime ? getMinutes(cls.starttime, cls.endtime) + "min" : ''}</td>
                <td>
                  <button onClick={() => unBookClass(cls as GymClass, user as User)} className="cancelBtn">
                    Avboka
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : <p>Du har inte några bokade pass</p>}
    </>

  );
};

export default BookedClassesTable;
