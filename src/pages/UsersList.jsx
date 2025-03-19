import { useEffect, useState } from 'react';
import { api } from '../api/api'; // Asegúrate de que la ruta sea correcta

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
